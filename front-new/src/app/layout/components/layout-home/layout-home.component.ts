import { Component } from '@angular/core';
import { LayoutHeaderComponent } from "../layout-header/layout-header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-home',
  imports: [LayoutHeaderComponent, RouterOutlet],
  templateUrl: './layout-home.component.html',
  styleUrl: './layout-home.component.scss'
})
export class LayoutHomeComponent {

}
