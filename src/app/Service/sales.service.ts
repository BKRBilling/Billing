import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  
  private SalesBillNoapiUrl = 'https://localhost:44345/api/SalesBillno'; 
  private PartyNameApiurl = 'https://localhost:44345/api/SalesPartyName';
  private SelectPartyName = 'https://localhost:44345/api/SelectPartyName';
  private ItemNameApiurl = 'https://localhost:44345/api/SalesItemName';
  private SelectItemName = 'https://localhost:44345/api/SelectItemName';

  constructor(private http: HttpClient) {}

  getSalesBillNo(): Observable<any[]> {
    return this.http.get<any[]>(this.SalesBillNoapiUrl);
  }
  getPartyName(): Observable<any[]> {
    return this.http.get<any[]>(this.PartyNameApiurl);
  }
  getPartyDetails(Partyname: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.SelectPartyName}/${Partyname}`);
  }
  getItemName(): Observable<any[]> {
    return this.http.get<any[]>(this.ItemNameApiurl);
  }
  getItemDetails(Itemname: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.SelectItemName}/${Itemname}`);
  }
  createSales(saleData: any): Observable<any> {
    const SalesapiUrl = 'https://localhost:44345/api/createSales';
    return this.http.post<any>(SalesapiUrl, saleData);
  }
}