import { PeopleInterface, PeopleInterfaceDTO } from './../interfaces/people.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UtilService } from './util.service';
import { EngagementInterface } from '../interfaces/engagement-interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private utilService: UtilService = inject(UtilService);
  private http: HttpClient = inject(HttpClient);

  listAll(): Observable<EngagementInterface[]> {
    return this.http.get<PeopleInterfaceDTO[]>(`${environment.url}/api/people`).pipe(
      map(res => {
        const people = new Array<PeopleInterface>;
        res.forEach(element => {
          people.push({
            id: element._id,
            email_cit: element['Email CI&T'],
            engagement: element.Engagement,
            first_name: element['First Name'],
            login: element.Login,
            name: element.Name,
            picture: element.picture,
            primary_skills: element['Primary Skills'],
            start_date: new Date(element['Start Date']),
            team: element.Team
          });
        });
        return people;
      }),
      map(item => this.utilService.transformPeopleToEngament(item))
    );
  }

  updateAll(): Observable<any> {
    return this.http.post(`${environment.url}/api/people`, {});
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.url}/api/person/${id}`);
  }
}
