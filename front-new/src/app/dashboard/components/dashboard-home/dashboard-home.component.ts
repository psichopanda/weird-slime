import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { PeopleService } from '../../../core/services/people.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { EngagementInterface } from '../../../core/interfaces/engagement-interface';
import { PanelModule } from 'primeng/panel';
import { FluidModule } from 'primeng/fluid';
import { DataViewModule } from 'primeng/dataview';
import { interval } from 'rxjs';
import { DasboardCardComponent } from "../dasboard-card/dasboard-card.component";
import { ScrollerModule } from 'primeng/scroller';

@Component({
  selector: 'app-dashboard-home',
  imports: [ButtonModule, CardModule, FieldsetModule, PanelModule, FluidModule, DataViewModule, DasboardCardComponent, ScrollerModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardHomeComponent implements OnInit {

  public engagement: EngagementInterface[] | undefined;
  private peopleService: PeopleService = inject(PeopleService);

  ngOnInit(): void {
<<<<<<< Updated upstream
    this.peopleService.listAll().subscribe(res => {
      this.engagement = res;
=======
    this.loadPeople();
  }

  loadPeople(): void {
    this.peopleService.listAll().pipe(map(item => this.vision === 'engagement' ? this.utilService.transformPeopleToEngament(item) : this.utilService.transformPeopleToTeam(item))).subscribe((res: any) => {
      if (this.vision === 'team') {
        this.teams = res;
        interval(5000).pipe(takeWhile(() => this.vision === 'team')).subscribe(() => {
          // @ts-ignore
          this.teams.push(this.teams.shift());
        });
      }

      if (this.vision === 'engagement') {
        this.engagement = res;
        interval(5000).pipe(takeWhile(() => this.vision === 'engagement')).subscribe(() => {
          // @ts-ignore
          this.engagement.push(this.engagement.shift());
        });
      }
>>>>>>> Stashed changes
    });

    // @ts-ignore
    interval(5000).subscribe(x => this.engagement.push(this.engagement.shift()));
  }


}
