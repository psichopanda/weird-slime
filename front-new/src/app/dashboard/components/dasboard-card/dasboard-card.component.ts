import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { PeopleInterface } from '../../../core/interfaces/people.interface';
import { CardModule } from 'primeng/card';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-dasboard-card',
  imports: [CardModule, SlicePipe],
  templateUrl: './dasboard-card.component.html',
  styleUrl: './dasboard-card.component.scss'
})
export class DasboardCardComponent {
  public people = input<PeopleInterface>();
  public showAnimation = input<boolean>();
}
