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
