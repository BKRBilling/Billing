import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent implements OnInit {

  stockData: any[] = [];
  ledgerGroup: any[] = [];
  error: string | null = null;

  ledgerForm = {
    ledgerName: '',
    ledgerUnder: '',
    address: '',
    mobileNo: '',
    openingBalance: ''
  };

  constructor(private ServiceService: ServiceService) {}

  ngOnInit(): void {
    this.ServiceService.getMaster().subscribe(
      (data) => (this.stockData = data),
      (err) => (this.error = 'Failed to load stock report')
    );
    this.ServiceService.getLedgerGroup().subscribe(
      (data) => (this.ledgerGroup = data),
      (err) => (this.error = 'Failed to load item groups')
    );
  }

  // Handle form submission
  onSubmit(): void {
    this.ServiceService.createLedger(this.ledgerForm).subscribe(
      (response) => {
        console.log('Ledger created successfully:', response);
        alert('Ledger created successfully!');
      },
      (error) => {
        console.error('Error creating ledger:', error);
        alert('Failed to create ledger. Please try again.');
      }
    );
  }
}
