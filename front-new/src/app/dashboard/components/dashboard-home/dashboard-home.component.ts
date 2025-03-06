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
import { interval, map, takeWhile } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { UtilService } from '../../../core/services/util.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { TeamInterface } from '../../../core/interfaces/team.interface';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-dashboard-home',
  imports: [
    ButtonModule,
    CardModule,
    FieldsetModule,
    PanelModule,
    FluidModule,
    DataViewModule,
    DasboardCardComponent,
    ScrollerModule,
    AvatarModule,
    AvatarGroupModule,
    RadioButtonModule,
    FormsModule,
    ToggleSwitchModule
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('animation', [
      transition('* <=> *', [
        query(':enter', [
          style({opacity: 0, transform: 'scale(0.7)'}),
          stagger(400, [
            animate('1800ms ease-in', style({opacity: 1, transform: 'scale(1)'}))
          ])
        ], { optional: true }),
        query(':leave', [
          style({opacity: 1, transform: 'scale(1)'}),
          stagger(-200, [
            animate('800ms ease-in', style({opacity: 0, transform: 'scale(0.7)'}))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class DashboardHomeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  public engagement: EngagementInterface[];
  public teams: TeamInterface[];
  public vision: string = 'team';
  public rotateTeams: boolean = true;

  private peopleService: PeopleService = inject(PeopleService);
  private utilService: UtilService = inject(UtilService);
  private transitionTime: number = 15000;

  ngOnInit(): void {
<<<<<<< HEAD
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
=======
    this.loadPeople();
    this.toggleRotateTeams();
>>>>>>> main
  }

  loadPeople(): void {
    this.blockUI.start();
    this.peopleService.listAll().pipe(map(item => this.vision === 'engagement' ? this.utilService.transformPeopleToEngament(item) : this.utilService.transformPeopleToTeam(item)))
      .subscribe((res: any) => {
      if (this.vision === 'team') {
        this.teams = res;
      }
      if (this.vision === 'engagement') {
        this.engagement = res;
      }
    }).add(() => {
      setTimeout(() => {
        this.blockUI.stop()
      }, 2000)
    });
  }

  toggleRotateTeams(): void {
    if (this.vision === 'team') {
      interval(this.transitionTime).pipe(takeWhile(() => this.vision === 'team' && this.rotateTeams)).subscribe(() => {
        this.teams.push(<TeamInterface>this.teams.shift());
      });
    }

    if (this.vision === 'engagement') {
      interval(this.transitionTime).pipe(takeWhile(() => this.vision === 'engagement' && this.rotateTeams)).subscribe(() => {
        this.engagement.push(<EngagementInterface>this.engagement.shift());
      });
    }
  }
}
