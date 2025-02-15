import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

    private sidebarVisibilitySubject = new BehaviorSubject<boolean>(true);
    sidebarVisibility$ = this.sidebarVisibilitySubject.asObservable();
  
    toggleSidebar() {
      this.sidebarVisibilitySubject.next(!this.sidebarVisibilitySubject.value);
    }

  private baseUrl = 'https://localhost:44345/api/';

  constructor(private http: HttpClient) {}

  getBillNo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}AdjustmentBillno`);
  }

  getItemName(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getItemName`);
  }

  getItemNameID(ItemName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getItemNameID/${ItemName}`);
  }

  getStockDisplay(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getStockDisplay`);
  }

  createStock(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createAdjustment`, data);
  }

  getSalesDisplay(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}SalesDisplay`);
  }

  getReceiptBillNo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ReceiptBillno`);
  }
  
  getReceiptLedgerName(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getLedgerName`);
  }

  getReceiptBalance(Partyname: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getBalance/${Partyname}`);
  }

  getReceiptDisplay(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getReceiptDisplay`);
  }

  createReceipt(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createReceipt`, data);
  }

  getMaster(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getLedger`);
  }

  getLedgerGroup(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getLedgerGroup`);
  }

  createLedger(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createledger`, data);
  }

  getitem(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getitems`);
  }

  getItemGroup(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getItemGroup`);
  }

  getItemUnit(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getItemUnit`);
  }

  createItem(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createItem`, data);
  }

  getStockReport(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}stockreport`);
  }

  getAccountReport(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}Accountsreport`);
  }
  
  getDashboardoutstanding(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}Dashboardoutstanding`);
  }

  getDashboardStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DashboardStock`);
  }

  getTodaySales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}TodaySales`);
  }

  getTotalSales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}TotalSales`);
  }

  getTodayReceipt(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}TodayReceipt`);
  }

  getTotalReceipt(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}YearlyReceipt`);
  }
}





