import { Injectable } from '@angular/core';
import { SignalService } from './signal.service';
import { VisionInterface } from '../interfaces/vision-interface';

@Injectable({
  providedIn: 'root'
})
export class VisionLocalStorageService extends SignalService<VisionInterface>{

  constructor() {
    super();
    this.initializeValues();
  }

  initializeValues(): void {
    const vision: VisionInterface = {
      rotate_teams: JSON.parse(<string>localStorage.getItem('vanguard-team-dashboard-rotate-teams')) ?? true,
      vision: JSON.parse(<string>localStorage.getItem('vanguard-team-dashboard-vision')) ? JSON.parse(<string>localStorage.getItem('vanguard-team-dashboard-vision')) : 'team'
    };
    this.state.set(vision);
  }

  updateValues(vision: VisionInterface): void {
    this.state.set(vision);
    localStorage.setItem('vanguard-team-dashboard-rotate-teams', vision.rotate_teams.toString());
    localStorage.setItem('vanguard-team-dashboard-vision', JSON.stringify(vision.vision));
  }
}
