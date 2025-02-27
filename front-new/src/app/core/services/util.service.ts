import { EngagementInterface } from '../interfaces/engagement-interface';
import { TeamInterface } from '../interfaces/team.interface';
import { PeopleInterface } from './../interfaces/people.interface';
import { Injectable } from '@angular/core';
import { groupBy, filter } from 'lodash'

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

  groupByKey(list: any[], key:string): any {
    return list.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {})
  }
}
