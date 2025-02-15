import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './Forms/home/home.component';
import { SalesComponent } from './Forms/sales/sales.component';
import { DisplayComponent } from './Forms/display/display.component';
import { ItemComponent } from './Forms/item/item.component';
import { MasterComponent } from './Forms/master/master.component';
import { InvertoryReportComponent } from './Forms/invertory-report/invertory-report.component';
import { AccountsReportComponent } from './Forms/accounts-report/accounts-report.component';
import { LoginFormComponent } from './Forms/login-form/login-form.component';
import { LayoutComponent } from './Forms/layout/layout.component';
import { RouterOutlet } from '@angular/router';

// Import Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ReceiptComponent } from './Forms/receipt/receipt.component';
import { StockComponent } from './Forms/stock/stock.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SalesComponent,
    DisplayComponent,
    ItemComponent,
    MasterComponent,
    InvertoryReportComponent,
    AccountsReportComponent,
    LoginFormComponent,
    LayoutComponent,
    ReceiptComponent,
    StockComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
    
    // Add Material Modules here
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
