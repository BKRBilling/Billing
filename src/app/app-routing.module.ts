import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Forms/home/home.component';
import { SalesComponent } from './Forms/sales/sales.component';
import { DisplayComponent } from './Forms/display/display.component';
import { ItemComponent } from './Forms/item/item.component';
import { MasterComponent } from './Forms/master/master.component';
import { InvertoryReportComponent } from './Forms/invertory-report/invertory-report.component';
import { AccountsReportComponent } from './Forms/accounts-report/accounts-report.component';
import { LoginFormComponent } from './Forms/login-form/login-form.component';
import { LayoutComponent } from './Forms/layout/layout.component';
import { ReceiptComponent } from './Forms/receipt/receipt.component';
import { StockComponent } from './Forms/stock/stock.component';

const routes: Routes = [
  { path: '', redirectTo: 'loginform', pathMatch: 'full' },
  { path: 'loginform', component: LoginFormComponent },
  { path: 'Layout', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: 'Home', component: HomeComponent },
      { path: 'Sales', component: SalesComponent },
      { path: 'Display', component: DisplayComponent },
      { path: 'Item', component: ItemComponent },
      { path: 'Master', component: MasterComponent },
      { path: 'Invertory', component: InvertoryReportComponent },
      { path: 'Accounts', component: AccountsReportComponent },
      { path: 'Receipt', component: ReceiptComponent},
      { path: 'Stock', component: StockComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
