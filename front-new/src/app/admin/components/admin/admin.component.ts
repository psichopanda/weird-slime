import { Component, inject, NgZone, OnInit } from '@angular/core';
import { PeopleService } from '../../../core/services/people.service';
import { environment } from '../../../../environments/environment';
import { NgIf } from '@angular/common';
import { UtilService } from '../../../core/services/util.service';
import { ButtonModule } from 'primeng/button';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessageInterface } from '../../../core/interfaces/message-interface';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-admin',
  imports: [NgIf, ButtonModule, MessageModule, ProgressSpinnerModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [MessageService]
})
export class AdminComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  public message: MessageInterface;
  public accessToken: string = '';
  public expiresAt: number = 0;
  public isLibraryLoaded = false;

  private utilService: UtilService = inject(UtilService);
  private peopleService: PeopleService = inject(PeopleService);
  private router: Router = inject(Router);
  private client: any;

  constructor(
    private ngZone: NgZone
  ) {}

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
    let accessToken = await this.getAccessToken();
    this.blockUI.start();
    this.peopleService.getPeopleDataSheet(accessToken).subscribe((data: any) => {
      let treatedData = this.utilService.transformSheetsData(data.values)
      this.peopleService.savePeople(treatedData).subscribe(data => {
        this.message = {
          message: data.success ? 'Sucesso em carregar a planilha' : 'Erro ao carregar a planilha',
          severity: data.success ? 'success' : 'error'
        };

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      })
    }, error => {
      this.message = {
        message: 'Error: ' + error.error.error.message,
        severity: 'error'
      }
    }).add(() => this.blockUI.stop())
  }

  async loadBadgePhotos(){
    this.message = {
      message: 'Loading album',
      severity: 'info',
      show_loading: true
    }
    if (this.isLibraryLoaded) {
      let accessToken = await this.getAccessToken();
      let people: any = await this.peopleService.getPeoplePhotos(accessToken);
      window.open(people.pickerUri, '_blank');
      let timer = setInterval( async () => {
        let check: any = await this.peopleService.checkPeoplePhotos(accessToken, people.id)
        if( check.mediaItemsSet ){
          clearInterval(timer)
          let images: any = await this.peopleService.fetchPeoplePhotos(accessToken, people.id)
          while(images.nextPageToken){
            images = await this.peopleService.fetchPeoplePhotos(accessToken, people.id, images.nextPageToken)
          }
          this.message = {
            message: 'Done loading photos!',
            severity: 'success'
          };

          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        }
      }, 5000)
    } else {
      this.message = {
        message: 'Google Photos Picker library is not loaded yet.',
        severity: 'warn'
      }
    }
  }

  isTokenExpired(): boolean {
    return Date.now() >= this.expiresAt;
  }

  async getAccessToken(): Promise<string> {
    if ( !this.accessToken || this.isTokenExpired() ) {
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
