import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { ServiceService } from '../../Service/service.service';

@Component({
    selector: 'app-accounts-report',
    templateUrl: './accounts-report.component.html',
    styleUrl: './accounts-report.component.css',
    standalone: false
})
export class AccountsReportComponent implements OnInit {

  stockData: any[] = [];
   error: string | null = null;
 
   constructor(private ServiceService: ServiceService) {}
 
   ngOnInit(): void {
     this.ServiceService.getAccountReport().subscribe(
       (data) => (this.stockData = data),
       (err) => (this.error = 'Failed to load stock report')
     );
   }
}

