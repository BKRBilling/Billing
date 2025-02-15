import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from '../../Service/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})

export class SalesComponent implements OnInit {

  salesForm: FormGroup;
  salesBillNo: string = '';
  partyNames: { Partyname: string }[] = [];
  itemNames: { Itemname: string }[] = [];
  addedItems: any[] = [];

  constructor(private fb: FormBuilder, private salesService: SalesService) {

    const today = new Date().toISOString().split('T')[0];

    this.salesForm = this.fb.group(
      {
      InvoiceNo: ['', [Validators.required]],
      InvoiceDate: [today, [Validators.required]],
      customerName: ['', Validators.required],
      id: [''],
      address1: [''],
      address2: [''],
      address3: [''],
      mobile: [''],
      itemid: [''],
      Items: [''],
      qty: [''],
      rate: [''],
      amount: [{ value: 0, disabled: true }],
      disAmount: [0, Validators.min(0)],
      totalAmount: [{ value: 0, disabled: true }]
    }
  );    
  }

  async ngOnInit(): Promise<void> {
   await this.fetchSalesBillNo();
   await this.fetchPartyName();
   await this.fetchItemName();
  }

  fetchSalesBillNo(): void {
    this.salesService.getSalesBillNo().subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.salesBillNo = response[0].Sales_BillNo;
          this.salesForm.patchValue({ InvoiceNo: this.salesBillNo });
        } else {
          console.warn('No Sales Bill No received from API.');
        }
      },
      (error) => {
        console.error('Error fetching Sales Bill No:', error);
      }
    );
  }

  fetchPartyName(): void {
    this.salesService.getPartyName().subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.partyNames = response;
        } else {
          console.warn('No party names received from API.');
        }
      },
      (error) => {
        console.error('Error fetching party names:', error);
      }
    );
  }
  
  CustomerNameChange(event: any): void {
    const selectedPartyName = event.target.value;
  
    if (!selectedPartyName) {
      this.salesForm.patchValue({
        id: '',
        address1: '',
        address2: '',
        address3: '',
        mobile: ''
      });
      return;
    }

    this.salesService.getPartyDetails(selectedPartyName).subscribe(
      (response) => {
        if (response && response.length > 0) {
          const partyDetails = response[0];
          this.salesForm.patchValue({
            id: partyDetails.id || '',
            address1: partyDetails.address1 || '',
            address2: partyDetails.address2 || '',
            address3: partyDetails.address3 || '',
            mobile: partyDetails.Mobile || ''
          });
        } else {
          console.warn('No details found for the selected party.');
        }
      },
      (error) => {
        console.error('Error fetching party details:', error);
      }
    );
  }

  fetchItemName(): void {
    this.salesService.getItemName().subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.itemNames = response;
        } else {
          console.warn('No item names received from API.');
        }
      },
      (error) => {
        console.error('Error fetching item names:', error);
      }
    );
  }

  onItemNameChange(event: any): void {
  const selectedItemName = event.target.value;

  if (!selectedItemName) {
    this.salesForm.patchValue({
      itemid: '',
      rate: 0
    });
    return;
  }

  this.salesService.getItemDetails(selectedItemName).subscribe(
    (response) => {
      if (response && response.length > 0) {
        const itemDetails = response[0];
        this.salesForm.patchValue({
          itemid: itemDetails.id || '',
          rate: itemDetails.srate || 0
        });
      } else {
        console.warn('No details found for the selected item.');
        this.salesForm.patchValue({
          rate: 0
        });
      }
    },
    (error) => {
      console.error('Error fetching item details:', error);
      this.salesForm.patchValue({
        rate: 0
      });
    }
  );
  }

  addItem(): void {
  const newItem = {
    Sale_date: new Date().toISOString().split('T')[0],
    itemid: this.salesForm.get('itemid')?.value,
    Items: this.salesForm.get('Items')?.value,
    qty: this.salesForm.get('qty')?.value,
    rate: this.salesForm.get('rate')?.value,
    amount: this.salesForm.get('amount')?.value,
    disAmount: this.salesForm.get('disAmount')?.value,
    totalAmount: this.salesForm.get('totalAmount')?.value
  };
  
  if (!newItem.Items || !newItem.qty || !newItem.rate || !newItem.itemid) {
    alert('Please fill in all the item details before adding.');
    return;
  }
  
  this.addedItems.push(newItem);

  this.salesForm.patchValue({
    itemid: '',
    Items: '',
    qty: 0,
    rate: 0,
    amount: 0,
    disAmount: 0,
    totalAmount: 0
  });
    this.calculateGrossAmount();
  }
  
  calculateAmount(): void {
    const qty: number = this.salesForm.get('qty')?.value || 0;
    const rate: number = this.salesForm.get('rate')?.value || 0;
    const amount: number = qty * rate;

    this.salesForm.get('amount')?.setValue(amount);
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    const amount: number = this.salesForm.get('amount')?.value || 0;
    const disAmount: number = this.salesForm.get('disAmount')?.value || 0;
    const totalAmount: number = amount - disAmount;

    this.salesForm.get('totalAmount')?.setValue(totalAmount);
  }

  calculateGrossAmount(): number 
  {
    return this.addedItems.reduce((sum, item) => sum + item.amount, 0);
  }
  
  calculateTotalDiscount(): number 
  {
    return this.addedItems.reduce((sum, item) => sum + item.disAmount, 0);
  }
  
  calculateNetAmount(): number 
  {
    return this.calculateGrossAmount() - this.calculateTotalDiscount();
  }  
  
  onSubmit(): void 
  {
    // console.log('Form Valid:', this.salesForm.valid);
    // console.log('Form Values:', this.salesForm.value);
    // console.log('Added Items:', this.addedItems);
  
    if (!this.salesForm.valid) {
      alert('Please fill in all required fields.');
      return;
    }
  
    if (!this.salesForm.get('customerName')?.value) {
      alert('Customer Name is required.');
      return;
    }
  
    if (!this.salesBillNo) {
      alert('Sales Bill No is required.');
      return;
    }
  
    if (this.addedItems.length === 0) {
      alert('At least one item must be added.');
      return;
    }
  
    const saleData = {
      Ledger_id: this.salesForm.get('id')?.value,
      Bill_No: this.salesBillNo,
      Sale_date: new Date().toISOString().split('T')[0],
      totalAmount: this.calculateNetAmount(),
      // salesItems: this.addedItems.map(item => (
      //   {
      //   Sale_date: new Date().toISOString().split('T')[0],
      //   itemid: item.itemid,
      //   quantity: item.qty,
      //   rate: item.rate,
      //   discountAmount: item.disAmount,
      //   totalAmount: item.totalAmount
      // }))
      salesItems : this.addedItems.filter((x) => x.itemid > 0)
    };
    
  
    console.log('Prepared Sale Data:', saleData);
  
    this.salesService.createSales(saleData).subscribe(
      (response) => {
        console.log('Sales created successfully:', response);
        alert('Sales created successfully!');
        this.clearForm();
      },
      (error) => {
        console.error('Error creating sale:', error.error || error.message);
        alert(`Error creating sale: ${error.error?.message || error.message}`);
      }
    );
  }
 
  clearForm(): void 
  {
    this.salesForm.reset();
    this.addedItems = [];
    const today = new Date().toISOString().split('T')[0];
    this.salesForm.patchValue({ InvoiceDate: today });
  }
}
