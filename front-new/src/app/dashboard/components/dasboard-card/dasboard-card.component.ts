import { Component, input } from '@angular/core';
import { PeopleInterface } from '../../../core/interfaces/people.interface';
import { CardModule } from 'primeng/card';
import { NamePipe } from '../../../core/pipes/name.pipe';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-dasboard-card',
  imports: [CardModule, NamePipe, ProgressBarModule],
  templateUrl: './dasboard-card.component.html',
  styleUrl: './dasboard-card.component.scss'
})
export class DasboardCardComponent {
  public people = input<PeopleInterface>();
  public showAnimation = input<boolean>();
}
