import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BlockUIModule],
  template: `
    <router-outlet>
      <ng-template #blockUITemplate>
        <div class="block-ui-template">
          <div class="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </ng-template>

      <block-ui [template]="blockUITemplate"></block-ui>
    </router-outlet>
  `
})
export class AppComponent {}
