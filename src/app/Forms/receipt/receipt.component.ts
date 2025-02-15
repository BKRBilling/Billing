import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  ReceiptDisplay: any[] = [];
  Partyname: any[] = [];
  ReceiptBillNo: string = '';
  error: string | null = null;
  isLoading: boolean = true;

  ReceiptForm = {
    Partyname: '',
    Receipt_Date: '',
    Receipt_No: '',
    Balance: '',
    Receipt_Amount: '',
    Ledger_ID: ''
  };

  constructor(private ServiceService: ServiceService) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.ReceiptForm.Receipt_Date = today;
    
    this.ServiceService.getReceiptDisplay().subscribe(
      (data) => (this.ReceiptDisplay = data),
      (err) => (this.error = 'Failed to load Receipt report')
    );
    this.ServiceService.getReceiptLedgerName().subscribe(
      (data) => (this.Partyname = data),
      (err) => (this.error = 'Failed to load Ledger Name')
    );
    this.ServiceService.getBillNo().subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.ReceiptBillNo = response[0].Vt_FullBillNo;
          this.ReceiptForm.Receipt_No = this.ReceiptBillNo;
        } else {
          console.warn('No Receipt Bill No received from API.');
        }
      },
      (error) => {
        console.error('Error fetching Receipt Bill No:', error);
        this.error = 'Failed to fetch Receipt Bill No.';
      }
    );
  }

  onPartynameChange(): void {
    if (this.ReceiptForm.Partyname) {
      this.isLoading = true;
      this.ServiceService.getReceiptBalance(this.ReceiptForm.Partyname).subscribe(
        (data) => {
          if (data && data.length > 0) {
            this.ReceiptForm.Balance = data[0].Balance; 
            this.ReceiptForm.Ledger_ID = data[0].Ledger_ID; 
            this.isLoading = false;
          } else {
            this.ReceiptForm.Balance = '';
            this.ReceiptForm.Ledger_ID = '';
            this.isLoading = false;
          }
        },
        (error) => {
          console.error('Error fetching balance:', error);
          this.error = 'Failed to fetch balance.';
          this.isLoading = false;
        }
      );
    } else {
      this.ReceiptForm.Balance = '';
    }
  }

  onSubmit(): void {
    if (!this.ReceiptForm.Partyname || !this.ReceiptForm.Receipt_Amount) {
      alert('Please fill all required fields');
      return;
    }
    
    this.ServiceService.createReceipt(this.ReceiptForm).subscribe(
      (response) => {
        console.log('Receipt created successfully:', response);
        alert('Receipt created successfully!');
      },
      (error) => {
        console.error('Error creating Receipt:', error);
        alert('Failed to create Receipt. Please try again.');
      }
    );
  }

}