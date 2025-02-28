import { Component, inject, input } from '@angular/core';
import { PeopleInterface } from '../../../core/interfaces/people.interface';
import { CardModule } from 'primeng/card';
import { NamePipe } from '../../../core/pipes/name.pipe';
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { DashboardProfileComponent } from '../dashboard-profile/dashboard-profile.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dasboard-card',
  imports: [CardModule, NamePipe, ProgressBarModule, DynamicDialogModule],
  templateUrl: './dasboard-card.component.html',
  styleUrl: './dasboard-card.component.scss',
  providers: [DialogService]
})
export class DasboardCardComponent {
  public people = input<PeopleInterface>();

  private dialogService = inject(DialogService);

  openProfile(people: PeopleInterface | undefined): void {
    this.dialogService.open(DashboardProfileComponent, {
      header: people?.name,
      data: people,
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      modal: true,
    });
  }
}
