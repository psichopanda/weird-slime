import { Component, OnInit } from '@angular/core';
import { PersonCardComponent } from '../person-card/person-card.component';
import { ApiService } from '../util/api.service';

@Component({
  selector: 'app-home',
  imports: [ PersonCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  people: any = [];

  constructor(
      private api: ApiService){}

  async ngOnInit(): Promise<void> {
    this.people = await this.api.getPeople()
  }
}
