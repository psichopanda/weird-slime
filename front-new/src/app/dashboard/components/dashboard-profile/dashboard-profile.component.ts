import { Component, inject } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PeopleInterface } from '../../../core/interfaces/people.interface';
import { IftaLabel } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-dashboard-profile',
  imports: [
    IftaLabel,
    InputTextModule,
    FormsModule,
    ProgressBar,
    ProgressBarModule,
    DatePickerModule,
    DividerModule
  ],
  templateUrl: './dashboard-profile.component.html',
  styleUrl: './dashboard-profile.component.scss'
})
export class DashboardProfileComponent {
  public config: DynamicDialogConfig<PeopleInterface> = inject(DynamicDialogConfig);
}
