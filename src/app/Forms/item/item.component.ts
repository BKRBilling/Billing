import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {

    stockData: any[] = [];
    ItemGroup: any[] = [];
    ItemUnit: any[] =[];
    error: string | null = null;

    ItemForm = {
      ItemName: '',
      ItemGroup: '',
      Unit: '',
      PRate: '',
      SRate: ''
    };
  
    constructor(private ServiceService: ServiceService) {}
  
    ngOnInit(): void {
      this.ServiceService.getitem().subscribe(
        (data) => (this.stockData = data),
        (err) => (this.error = 'Failed to load stock report')
      );
      this.ServiceService.getItemGroup().subscribe(
        (data) => (this.ItemGroup = data),
        (err) => (this.error = 'Failed to load item groups')
      );
      this.ServiceService.getItemUnit().subscribe(
        (data) => (this.ItemUnit = data),
        (err) => (this.error = 'Failed to load item groups')
      );
    }
    
  onSubmit(): void {
    this.ServiceService.createItem(this.ItemForm).subscribe(
      (response) => {
        console.log('Item created successfully:', response);
        alert('Item created successfully!');
      },
      (error) => {
        console.error('Error creating Item:', error);
        alert('Failed to create Item. Please try again.');
      }
    );
  }

}



