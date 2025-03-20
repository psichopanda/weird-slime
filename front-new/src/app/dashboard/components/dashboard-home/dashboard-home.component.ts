import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit, Signal } from '@angular/core';
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
import { interval, map, Subject, Subscription, takeUntil, takeWhile } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { UtilService } from '../../../core/services/util.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { TeamInterface } from '../../../core/interfaces/team.interface';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { VisionLocalStorageService } from '../../../core/services/vision-local-storage.service';
import { VisionInterface } from '../../../core/interfaces/vision-interface';
import { PeopleInterface } from '../../../core/interfaces/people.interface';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';

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
          style({opacity: 0, transform: `scale(${environment.animations.in.scale})`}),
          stagger(environment.animations.in.stagger, [
            animate(`${environment.animations.in.ease}ms ease-in`, style({opacity: 1, transform: 'scale(1)'}))
          ])
        ], { optional: true }),
        query(':leave', [
          style({opacity: 1, transform: `scale(${environment.animations.out.scale})`}),
          stagger(environment.animations.out.stagger, [
            animate(`${environment.animations.out.ease}ms ease-out`, style({opacity: 0, transform: 'scale(0.7)'}))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI;

  public engagement: EngagementInterface[];
  public teams: TeamInterface[];
  public people: PeopleInterface[];

  private visionLocalStorageService: VisionLocalStorageService = inject(VisionLocalStorageService);
  private peopleService: PeopleService = inject(PeopleService);
  private utilService: UtilService = inject(UtilService);
  private transitionTime: number = environment.animations.transition_time;
  private unsub: Subject<void> = new Subject<void>();
  private engagementInterval: Subscription;
  private peopleInterval: Subscription;
  private teamInterval: Subscription;

  readonly vision: Signal<VisionInterface> = inject(VisionLocalStorageService).state.asReadonly();

  ngOnInit(): void {
    this.loadPeople();
    this.toggleRotateTeams();
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
    this.engagementInterval.unsubscribe();
    this.peopleInterval.unsubscribe();
    this.teamInterval.unsubscribe();
  }

  loadPeople(): void {
    this.blockUI.start();
    this.peopleService.listAll().pipe(map(item =>
      {
        let transformedData;
        switch (this.vision().vision) {
          case "engagement":
            transformedData = this.utilService.transformPeopleToEngament(item);
            break;
          case "team":
            transformedData = this.utilService.transformPeopleToTeam(item);
            break;
          default:
            transformedData = _.sortBy(item, function(item) { return item.start_date; }).reverse()
        }
        return transformedData
      })).subscribe((res: any) => {
      if (this.vision().vision === 'team') {
        this.teams = res;
      }
      if (this.vision().vision === 'engagement') {
        this.engagement = res;
      }
      if (this.vision().vision === 'people') {
        this.people = res;
      }
      this.toggleRotateTeams();
    }).add(() => {
      setTimeout(() => {
        this.blockUI.stop()
      }, 2000)
    });
    this.visionLocalStorageService.updateValues(this.vision());
  }

  toggleRotateTeams(): void {
    if (this.vision().vision === 'team') {
      if (!this.teamInterval || this.teamInterval.closed) {
        this.teamInterval = interval(this.transitionTime).pipe(takeWhile(() => this.vision().vision === 'team' && this.vision().rotate_teams), takeUntil(this.unsub)).subscribe(() => {
          this.teams.push(<TeamInterface>this.teams.shift());
        });
      }
      this.peopleInterval ? this.peopleInterval.unsubscribe() : null;
      this.engagementInterval ? this.engagementInterval.unsubscribe() : null;
    }

    if (this.vision().vision === 'engagement') {
      if (!this.engagementInterval || this.engagementInterval.closed) {
        this.engagementInterval = interval(this.transitionTime).pipe(takeWhile(() => this.vision().vision === 'engagement' && this.vision().rotate_teams), takeUntil(this.unsub)).subscribe(() => {
          this.engagement.push(<EngagementInterface>this.engagement.shift());
        });
      }
      this.peopleInterval ? this.peopleInterval.unsubscribe() : null;
      this.teamInterval ? this.teamInterval.unsubscribe() : null;
    }

    if (this.vision().vision === 'people') {
      if (!this.peopleInterval || this.peopleInterval.closed) {
        this.peopleInterval = interval(this.transitionTime).pipe(takeWhile(() => this.vision().vision === 'people' && this.vision().rotate_teams), takeUntil(this.unsub)).subscribe(() => {
          this.people.push(<PeopleInterface>this.people.shift());
        });
      }
      this.teamInterval ? this.teamInterval.unsubscribe() : null;
      this.engagementInterval ? this.engagementInterval.unsubscribe() : null;
    }
    this.visionLocalStorageService.updateValues(this.vision());
  }
}
