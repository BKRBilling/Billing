import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from '../../Service/service.service'; 
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})

export class LayoutComponent implements OnInit, OnDestroy {

  isSidebarVisible = true;
  isSubmenuOpen = false;
  private sidebarSubscription: Subscription = new Subscription();
  
  constructor(private ServiceService: ServiceService) {}

  ngOnInit() {
    this.sidebarSubscription = this.ServiceService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }
  

  ngOnDestroy() {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }
}

