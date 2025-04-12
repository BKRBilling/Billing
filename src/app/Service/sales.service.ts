import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  //private baseUrl = 'https://localhost:44345/api/';
  private baseUrl = 'https://192.168.236.174:1495/api/';

  constructor(private http: HttpClient) {}

  getSalesBillNo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}SalesBillno`);
  }
  getPartyName(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}SalesPartyName`);
  }
  getPartyDetails(Partyname: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}SelectPartyName/${Partyname}`);
  }
  getItemDetails(Itemname: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}SelectItemName/${Itemname}`);
  }
  getItemName(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}SalesItemName`);
  }
  createSales(saleData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createSales`, saleData);
  }
}
