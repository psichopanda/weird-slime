import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';

@Component({
  selector: 'person-card',
  imports: [MatCardModule, NgFor],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCardComponent {
  @Input() people: any[] = [];
}
