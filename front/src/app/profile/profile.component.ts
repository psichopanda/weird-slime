import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../util/api.service';
declare var google: any;

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  credential: any
  sheets: any
  person: any

  constructor(private ngZone: NgZone, private api: ApiService) {}

  ngOnInit() {
    this.loadGoogleSignInAPI();
  }

  async loadGoogleSignInAPI() {
    google.accounts.id.initialize({
      client_id: environment.googleClient,
      callback: (response: any) => this.handleCredentialResponse(response),
      context: "signin",
      auto_select: false,
    });
    google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { 
        theme: "filled_blue", 
        size: "large", 
        width: 200, 
        shape: "pill", 
        logo_alignment: "left"
      }
    );
  }

  handleCredentialResponse(response: any) {
    this.ngZone.run(async () => {
      const payload = this.decodeJwtResponse(response.credential);
      let person = await this.api.getPerson(payload.email)
      if(person && !person.picture){
        await this.api.savePicture(payload.email, payload.picture)
        alert("Picture set!")
      }
      console.log("User information:", payload)
      console.log("response: ", response)
      this.credential = response.credential
    });
  }

  private decodeJwtResponse(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}
