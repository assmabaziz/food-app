import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  _SharedService = inject(SharedService)
  valueSideBarChanged:Signal<boolean> = computed(()=> this._SharedService.sideBarChanged())
}
