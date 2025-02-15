import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { ServiceService } from '../../Service/service.service';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrl: './display.component.css',
    standalone: false
})
export class DisplayComponent {
   stockData: any[] = [];
    error: string | null = null;
  
    constructor(private ServiceService: ServiceService) {}
  
    ngOnInit(): void {
      this.ServiceService.getSalesDisplay().subscribe(
        (data) => (this.stockData = data),
        (err) => (this.error = 'Failed to load stock report')
      );
    }
}
