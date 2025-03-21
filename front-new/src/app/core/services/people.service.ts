
import { BadgeInterface, PeopleInterface } from './../interfaces/people.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import moment, { Moment } from 'moment';
import { Badges } from '../exports/badge.export';

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
    return this.http.get<PeopleInterface[]>(`${environment.url}/api/people`).pipe(map(item  => {
      return item.map(i => {
        i.profile_completion = this.getRandomInt(1, 100);
        i.start_date = i.start_date ? new Date(i.start_date) : null;
        /**
         * 20% de chance de obter a badge 'Birth Cake'
         */
        i.show_birthday = Math.random() >= 0.8;
        i.new_employ = i.start_date ? this.checkStartDate(moment(i.start_date)) : false;
        i.badges = this.updateBadges(i);
        return i;
      });
    }));
  }

  savePeople(peopleData: any): Observable<any> {
    return this.http.post(`${environment.url}/api/people`, peopleData);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.url}/api/person/${id}`);
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Verificamos se é data futura ou se hoje esta dentro de 1 mes em que a pessoa começou
   * @param startDate
   * @private
   */
  private checkStartDate(startDate: Moment): boolean {
    if (startDate.isAfter(moment())) {
      return true;
    }
    return moment().isBetween(moment(startDate), moment(startDate).add(1, 'month'));
  }

  private updateBadges(people: PeopleInterface): BadgeInterface[] {
    const badges = new Array<BadgeInterface>();

    if (environment.developers.includes(people.email_cit)) {
      const badgeDeveloper = Badges.filter(b => b.slug === 'developer')[0];
      badges.push(badgeDeveloper);
    }

    if (people.show_birthday) {
      const badgeBirthDayCake = Badges.filter(b => b.slug === 'birthday_cake')[0];
      badges.push(badgeBirthDayCake);
    }

    return badges;
  }
}
