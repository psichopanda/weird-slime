import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PeopleInterface, PeopleInterfaceDTO } from '../interfaces/people.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private http: HttpClient = inject(HttpClient);

  listAll(): Observable<PeopleInterface[]> {
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
            team: element.Team,
            profile_completion: this.getRandomInt(1, 100)
          });
        });
        return people;
      })
    );
  }

  updateAll(): Observable<any> {
    return this.http.post(`${environment.url}/api/people`, {});
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.url}/api/person/${id}`);
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
