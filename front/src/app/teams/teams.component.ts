import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { KeysPipe } from "../keys.pipe";
import { PersonCardComponent } from '../person-card/person-card.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-teams',
  imports: [MatCardModule, NgFor, KeysPipe, PersonCardComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent implements OnInit {
  engagements: any;

  constructor(private api: ApiService){
    
  }
  async ngOnInit(): Promise<void> {
    let people = await this.api.getPeople()
    let engagements = this.groupByKey(people, "Engagement")

    for(let key of Object.keys(engagements)){
      let teams = this.groupByKey(engagements[key], "Team")
      engagements[key] = teams
    }
    this.engagements = engagements
  }

  groupByKey(list:any[], key:string){
    return list.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {})
  }
}
