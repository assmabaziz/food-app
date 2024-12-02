import { Component, inject, signal, WritableSignal } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
   _SharedService = inject(SharedService)
  userName: string | null = '';


  ngOnInit(): void {
    if (localStorage.getItem('userName')) {
      // console.log(localStorage.getItem('userName'));
      this.userName = localStorage.getItem('userName');
    }


  }



}
