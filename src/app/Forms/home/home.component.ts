import { Component, ViewChild, ElementRef } from '@angular/core';
import { ServiceService } from '../../Service/service.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent {
  
  @ViewChild('piecanvasTotal', { static: true }) piecanvasTotal!: ElementRef;
  @ViewChild('piecanvasToday', { static: true }) piecanvasToday!: ElementRef;

  piechart: any;
  PiechartToday: any;

  DashboardoutstandingData: any[] = [];
  DashboardStockData: any[] = [];
  TodaySalesData: any[] = [];
  TotalSalesData: any[] = [];
  TodayReceiptData: any[] = [];
  TotalReceiptData: any[] = [];
  error: string | null = null;

  constructor(private ServiceService: ServiceService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.ServiceService.getDashboardoutstanding().subscribe(
      (data) => (this.DashboardoutstandingData = data),
      (err) => (this.error = 'Failed to load outstanding report')
    );
    this.ServiceService.getDashboardStock().subscribe(
      (data) => (this.DashboardStockData = data),
      (err) => (this.error = 'Failed to load stock report')
    );
    this.ServiceService.getTodaySales().subscribe(
      (data) => {
        this.TodaySalesData = data;
        this.initializeCharts();
      },
      (err) => (this.error = 'Failed to load today\'s sales data')
    );
    this.ServiceService.getTotalSales().subscribe(
      (data) => {
        this.TotalSalesData = data;
        this.initializeCharts();
      },
      (err) => (this.error = 'Failed to load total sales data')
    );
    this.ServiceService.getTodayReceipt().subscribe(
      (data) => {
        this.TodayReceiptData = data;
        this.initializeCharts();
      },
      (err) => (this.error = 'Failed to load today\'s receipt data')
    );
    this.ServiceService.getTotalReceipt().subscribe(
      (data) => {
        this.TotalReceiptData = data;
        this.initializeCharts();
      },
      (err) => (this.error = 'Failed to load total receipt data')
    );
  }

  initializeCharts(): void {
    if (this.TotalSalesData.length === 0 || this.TotalReceiptData.length === 0 || this.TodaySalesData.length === 0 || this.TodayReceiptData.length === 0) {
      return;
    }
    
    const totalCtx = this.piecanvasTotal.nativeElement.getContext('2d');
    const todayCtx = this.piecanvasToday.nativeElement.getContext('2d');

    const totalSalesAmount = this.extractAmount(this.TotalSalesData);
    const totalReceiptAmount = this.extractAmount(this.TotalReceiptData);
    const todaySalesAmount = this.extractAmount(this.TodaySalesData);
    const todayReceiptAmount = this.extractAmount(this.TodayReceiptData);

    this.piechart = new Chart(totalCtx, {
      type: 'pie',
      data: {
        labels: ['Sales', 'Receipt'],
        datasets: [
          {
            label: 'Sales vs Receipt',
            data: [totalSalesAmount, totalReceiptAmount],
            backgroundColor: ['#057dcd','#FF6361'],
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });

    this.PiechartToday = new Chart(todayCtx, {
      type: 'pie',
      data: {
        labels: ['Sales', 'Receipt'],
        datasets: [
          {
            label: 'Today\'s Sales vs Receipt',
            data: [todaySalesAmount, todayReceiptAmount],
            backgroundColor: ['#057dcd','#FF6361'],
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }

extractAmount(data: any[]): number {
  if (data.length === 0) return 0;
  return data.reduce((acc, item) => {
    if (item.Total_Amount) {
      return acc + item.Total_Amount;
    }
    if (item.Receipt_Amount) {
      return acc + item.Receipt_Amount;
    }
    if (item.Today_Sales) {
      return acc + item.Today_Sales;
    }
    if (item.Today_Receipt) {
      return acc + item.Today_Receipt;
    }
    return acc;
  }, 0);
}

}
