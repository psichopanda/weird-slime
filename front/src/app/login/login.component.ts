import { SocialAuthService, GoogleSigninButtonModule, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";

import { MatButtonModule } from '@angular/material/button';
import { Router } from "@angular/router";
import { ApiService } from "../util/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [GoogleSigninButtonModule, MatCardModule, MatButtonModule]
})

export class LoginComponent{
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private apiService: ApiService
  ) { }

  async getAccessToken(){
    let accessToken
    if(!accessToken){
      accessToken = await this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID)
    }
    await this.apiService.getPeopleFromSheets(accessToken)
    this.router.navigate([''])
  }
}
