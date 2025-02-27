import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { PeopleService } from '../../../core/services/people.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { EngagementInterface } from '../../../core/interfaces/engagement-interface';
import { PanelModule } from 'primeng/panel';
import { FluidModule } from 'primeng/fluid';
import { DataViewModule } from 'primeng/dataview';
import { DasboardCardComponent } from "../dasboard-card/dasboard-card.component";
import { ScrollerModule } from 'primeng/scroller';
import { interval } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-dashboard-home',
  imports: [ButtonModule, CardModule, FieldsetModule, PanelModule, FluidModule, DataViewModule, DasboardCardComponent, ScrollerModule, AvatarModule, AvatarGroupModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardHomeComponent implements OnInit {

  public engagement!: EngagementInterface[];
  private peopleService: PeopleService = inject(PeopleService);

  ngOnInit(): void {
    this.peopleService.listAll().subscribe(res => {
      this.engagement = res;
    });

    /**
     * TODO Rotacionar times dentro do engagement
     */
    interval(10000).subscribe(() => {
      // @ts-ignore
      this.engagement.push(this.engagement.shift());
    });
  }

  // async rotateTeams(engagementIndex: number): Promise<any> {
  //   return await new Promise((resolve) => {
  //     for (let i = 0; i <= 2; i++) {
  //       interval(5000).subscribe(async x => {
  //         console.log(this.engagement[engagementIndex].teams[i])
  //         this.engagement[engagementIndex].teams.push(this.engagement[engagementIndex].teams.shift());
  //         await timeout(1500);
  //       })
  //     }
  //     console.log('')
  //     resolve(true);
  //   });
  // }

  // async waitUntil(condition: boolean) {
  //   console.log('started')
  //   return await new Promise(resolve => {
  //     const interval = setInterval(() => {
  //       if (condition) {
  //         resolve('foo');
  //         clearInterval(interval);
  //       };
  //     }, 1000);
  //   });
  // }
}
