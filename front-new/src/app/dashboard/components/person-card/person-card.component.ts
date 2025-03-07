import { Component, inject, input } from '@angular/core';
import { PeopleInterface } from '../../../core/interfaces/people.interface';
import { CardModule } from 'primeng/card';
import { NamePipe } from '../../../core/pipes/name.pipe';
import { ProgressBarModule } from 'primeng/progressbar';
import { DashboardProfileComponent } from '../dashboard-profile/dashboard-profile.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-person-card',
  imports: [CardModule, NamePipe, ProgressBarModule, DynamicDialogModule, TooltipModule],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss',
  providers: [DialogService]
})
export class PersonCardComponent {
  public people = input<PeopleInterface>();

  private dialogService = inject(DialogService);

  openProfile(people: PeopleInterface | undefined): void {
    this.dialogService.open(DashboardProfileComponent, {
      header: people?.first_name,
      data: people,
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      modal: true,
      dismissableMask: true,
      closable: true
    });
  }
}
