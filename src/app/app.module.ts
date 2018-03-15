import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatTableModule,
  MatButtonModule, MatFormFieldModule, MatInputModule, MatInput, MatDialogModule,
  MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { BoardComponent } from './_components/board/board.component';

import { AddPlayerDialogComponent } from './_components/add-player-dialog/add-player-dialog.component';
import { BuyInDialogComponent } from './_components/buy-in-dialog/buy-in-dialog.component';
import { CheckoutDialogComponent } from './_components/checkout-dialog/checkout-dialog.component';

import { CalculatorService } from './_services/calculator.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BoardComponent,
    AddPlayerDialogComponent,
    BuyInDialogComponent,
    CheckoutDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    CalculatorService
  ],
  entryComponents: [
    AddPlayerDialogComponent,
    BuyInDialogComponent,
    CheckoutDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
