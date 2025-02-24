import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  selector: 'app-root',
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'Slime';
}
