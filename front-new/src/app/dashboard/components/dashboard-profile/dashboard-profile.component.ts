import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { JsonPipe } from '@angular/common';
import { PeopleInterface } from '../../../core/interfaces/people.interface';
import { IftaLabel } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-dashboard-profile',
  imports: [
    Button,
    JsonPipe,
    IftaLabel,
    InputTextModule,
    FormsModule,
    ProgressBar,
    ProgressBarModule,
    DatePickerModule
  ],
  templateUrl: './dashboard-profile.component.html',
  styleUrl: './dashboard-profile.component.scss'
})
export class DashboardProfileComponent {

  public config: DynamicDialogConfig<PeopleInterface> = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);

  closeModal(): void {
    this.ref.close();
  }
}
