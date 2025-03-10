import { Component, inject, NgZone, OnInit } from '@angular/core';
import { PeopleService } from '../../../core/services/people.service';
import { environment } from '../../../../environments/environment';
import { NgIf } from '@angular/common';
import { UtilService } from '../../../core/services/util.service';

declare var google: any;
declare var gapi: any;

@Component({
  selector: 'app-admin',
  imports: [NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  accessToken: string = '';
  private client: any;
  expiresAt: number = 0;
  isLibraryLoaded = false;
  private utilService: UtilService = inject(UtilService);
  private peopleService: PeopleService = inject(PeopleService);
  photosSession: any

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.initializeGoogleAuth();
  }

  initializeGoogleAuth() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // After GIS is loaded, load Photos Picker library
      const pickerScript = document.createElement('script');
      pickerScript.src = 'https://apis.google.com/js/api.js';
      pickerScript.async = true;
      pickerScript.defer = true;
      document.body.appendChild(pickerScript);

      pickerScript.onload = () => {
        this.ngZone.run(() => {
          this.isLibraryLoaded = true;
          this.initializeGoogleSignIn();
        });
      };
      this.initializeGoogleSignIn();
    };
  }

  initializeGoogleSignIn() {
    const scopes = [
      'profile',
      'https://www.googleapis.com/auth/spreadsheets.readonly', 
      'https://www.googleapis.com/auth/photospicker.mediaitems.readonly',
    ]
    this.client = google.accounts.oauth2.initTokenClient({
      client_id: environment.googleClient,
      scope: scopes.join(' '),
      callback: (tokenResponse: any) => {
        this.ngZone.run(() => {
          this.handleTokenResponse(tokenResponse);
        });
      },
    });
  }

  handleTokenResponse(tokenResponse: any) {
    this.accessToken = tokenResponse.access_token;
    this.expiresAt = Date.now() + (tokenResponse.expires_in * 1000);
  }

  async loadPeopleSpreadsheet(){
    alert('loading sheet')
    let accessToken = await this.getAccessToken()
    this.peopleService.getPeopleDataSheet(accessToken).subscribe( (data: any) => {
      let treatedData = this.utilService.transformSheetsData(data.values)
      this.peopleService.savePeople(treatedData).subscribe(
        data => alert(`${data.success ? "Success!" : "Failed!"}`)
      )
    })
  }

  async loadBadgePhotos(){
    alert('loading album')
    if (this.isLibraryLoaded) {
      let accessToken = await this.getAccessToken()
      let people: any = await this.peopleService.getPeoplePhotos(accessToken)
      this.photosSession = people
      let timer = setInterval( async () => {
        let check: any = await this.peopleService.checkPeoplePhotos(accessToken, people.id)
        if( check.mediaItemsSet ){
          clearInterval(timer)
          let images: any = await this.peopleService.fetchPeoplePhotos(accessToken, people.id)
          while(images.nextPageToken){
            images = await this.peopleService.fetchPeoplePhotos(accessToken, people.id, images.nextPageToken)
          }
          alert("done loading photos!")
        }
      }, 5000)
    } else {
      alert('Google Photos Picker library is not loaded yet.');
    }
  }

  isTokenExpired(): boolean {
    return Date.now() >= this.expiresAt;
  }

  async getAccessToken(): Promise<string> {
    if ( !this.accessToken || this.isTokenExpired() ) {
      console.log('Invalid token, requesting new one')
      return new Promise((resolve) => {
        this.client.callback = (tokenResponse: any) => {
          this.ngZone.run(() => {
            this.handleTokenResponse(tokenResponse);
            resolve(this.accessToken);
          });
        };
        this.client.requestAccessToken();
      });
    }
    return this.accessToken
  }
}
