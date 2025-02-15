import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-invertory-report',
  templateUrl: './invertory-report.component.html',
  styleUrls: ['./invertory-report.component.css'],
})
export class InvertoryReportComponent implements OnInit {

  stockData: any[] = [];
  error: string | null = null;

  constructor(private ServiceService: ServiceService) {}

  ngOnInit(): void {
    this.ServiceService.getStockReport().subscribe(
      (data) => (this.stockData = data),
      (err) => (this.error = 'Failed to load stock report')
    );
  }
}

