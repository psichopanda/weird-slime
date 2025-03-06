import { PeopleInterface } from './../interfaces/people.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private http: HttpClient = inject(HttpClient);

  getPeopleDataSheet(accessToken: string){
    let spreadsheetId = environment.sheetsId
    let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/People`
    let headers = { Authorization: `Bearer ${accessToken}`}
    return this.http.get( encodeURI(url), { headers } )
  }

  async getPeoplePhotos(accessToken: string){
    let observeObj = this.http.get(`${environment.url}/api/people/photos?token=${accessToken}`)
    return new Promise(resolve => {
      observeObj.subscribe(value => {
        resolve(value)
      })
    })
  }

  async checkPeoplePhotos(accessToken: string, id: string){
    const url = `${environment.url}/api/people/photosCheck?token=${accessToken}&id=${id}`
    let observeObj = this.http.get(url)
    return new Promise(resolve => {
      observeObj.subscribe(value => {
        resolve(value)
      })
    })
  }

  async fetchPeoplePhotos(accessToken: string, id: string, pageToken:string=''){
    let url = `${environment.url}/api/people/fetchPhotos?token=${accessToken}&id=${id}`
    if(pageToken) url += `&pageToken=${pageToken}`
    let observeObj = this.http.get(url)
    return new Promise(resolve => {
      observeObj.subscribe(value => {
        resolve(value)
      })
    })
  }

  listAll(): Observable<PeopleInterface[]> {
    return this.http.get<PeopleInterface[]>(`${environment.url}/api/people`);
  }

  savePeople(peopleData: any): Observable<any> {
    return this.http.post(`${environment.url}/api/people`, peopleData);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.url}/api/person/${id}`);
  }
}
