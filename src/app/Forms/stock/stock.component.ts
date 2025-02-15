import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  StockDisplay: any[] = [];
  Itemname: any[] = [];
  AdjustmentBillno: string = '';
  error: string | null = null;
  isLoading: boolean = true;

  StockForm = {
    ItemName: '',
    Date: '',
    Bill_NO: '',
    AddQty: '',
    LessQty: '',
    ItemID: ''
  };

  constructor(private ServiceService: ServiceService) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.StockForm.Date = today;

    this.loadData();
  }

  loadData() {
    this.ServiceService.getStockDisplay().subscribe(
      (data) => this.StockDisplay = data,
      (err) => this.error = 'Failed to load Adjustment report'
    );

    this.ServiceService.getItemName().subscribe(
      (data) => this.Itemname = data,
      (err) => this.error = 'Failed to load Ledger Name'
    );

    this.ServiceService.getBillNo().subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.AdjustmentBillno = response[0].Vt_FullBillNo;
          this.StockForm.Bill_NO = this.AdjustmentBillno;
        } else {
          console.warn('No Adjustment Bill No received from API.');
        }
      },
      (error) => {
        console.error('Error fetching Adjustment Bill No:', error);
        this.error = 'Failed to fetch Adjustment Bill No.';
      }
    );
  }

  onItemnameChange(): void {
    if (this.StockForm.ItemName) {
      this.isLoading = true;
      this.ServiceService.getItemNameID(this.StockForm.ItemName).subscribe(
        (data) => {
          if (data && data.length > 0) {
            this.StockForm.AddQty = data[0].AddQty;
            this.StockForm.LessQty = data[0].LessQty; 
            this.StockForm.ItemID = data[0].ItemID; 
            this.isLoading = false;
          } else {
            this.StockForm.AddQty = '';
            this.StockForm.LessQty = '';
            this.StockForm.ItemID = '';
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
      this.StockForm.AddQty = '';
      this.StockForm.LessQty = '';
    }
  }

  onSubmit(): void {
    if (!this.StockForm.ItemName || !this.StockForm.AddQty || !this.StockForm.LessQty) {
      alert('Please fill all required fields');
      return;
    }
  
    if (isNaN(Number(this.StockForm.AddQty)) || isNaN(Number(this.StockForm.LessQty))) {
      alert('Please enter valid numeric values for Add Qty and Less Qty');
      return;
    }
  
  console.log('Submitting data:', this.StockForm);
  
    this.ServiceService.createStock(this.StockForm).subscribe(
      (response) => {
        console.log('Adjustment created successfully:', response);
        alert('Adjustment created successfully!');
        this.loadData();
      },
      (error) => {
        console.error('Error creating Adjustment:', error);
        alert('Failed to create Adjustment. Please try again.');
      }
    );
  }
  
}
