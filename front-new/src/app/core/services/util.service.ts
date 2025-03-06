import { EngagementInterface } from '../interfaces/engagement-interface';
import { TeamInterface } from '../interfaces/team.interface';
import { PeopleInterface } from './../interfaces/people.interface';
import { Injectable } from '@angular/core';
import { groupBy, filter, forEach } from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public transformPeopleToEngament(people: PeopleInterface[]): EngagementInterface[] {
    const engagements = new Array<EngagementInterface>();
    people.forEach(item => {
      if (!engagements.find(i => i.name === item.engagement)) {
        engagements.push({
          name: item.engagement,
          teams: this.filterTeam(people, item.engagement)
        });
      }
    });
    return engagements;
  }

  public transformPeopleToTeam(people: PeopleInterface[]): TeamInterface[] {
    const teams = new Array<TeamInterface>();
    const filteredPeople = groupBy(people, 'team');

    for(let key of Object.keys(filteredPeople)) {
      teams.push({
        name: key,
        people: filteredPeople[key]
      });
    }

    return teams;
  }

  public transformSheetsData(sheetsData: any){
    let allowedFields: string[] = ['Name', 'Start Date', 'Engagement', 
      'Team', 'Email CI&T', 'Login', 'Primary Skills', 'First Name']
    let columnTranslation: any = { 
      'Name': 'name', 'Start Date': 'start_date', 'Engagement': 'engagement',
      'Email CI&T': 'email_cit', 'Primary Skills': 'primary_skills',
      'First Name': 'first_name', 'Team': 'team', 'Login': 'login',
     }
    let people:any = []
    for(let l=4; l<sheetsData.length; l++){
      let person: any = {}
      if(l == 4) continue;
      for( let c=0; c < sheetsData[l].length; c++ ){
        let columnTitle = sheetsData[4][c]
        if(allowedFields.includes(columnTitle))
          person[ columnTranslation[columnTitle] ] = sheetsData[l][c]
      }
      people.push(person)
    }
    return people
  }

  private filterTeam(people: PeopleInterface[], engagement: string) {
    const filteredPeople = people.filter(i => i.engagement === engagement);
    const peopleByGroup = groupBy(filteredPeople, 'team');
    const teams = new Array<TeamInterface>();
    for(let key of Object.keys(peopleByGroup)) {
      teams.push({
        name: key,
        people: peopleByGroup[key]
      });
    }
    return teams;
  }
}
