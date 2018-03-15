import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { BuyInDialogComponent } from '../buy-in-dialog/buy-in-dialog.component';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import { CalculatorService } from '../../_services/calculator.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  displayedColumns = ['name', 'chips'];
  displayedResultColumns = ['name', 'score'];
  dataSource = new MatTableDataSource<any>();
  resultSource = new MatTableDataSource<any>();
  constructor(public game: CalculatorService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.game.getUpdateEvent().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.game.getUpdateResultEvent().subscribe((data) => {
      this.resultSource.data = data;
    });
  }

  addPlayer() {
    this.dialog.open(AddPlayerDialogComponent,  {
      width: '50%',
      position: {top: '100px'}
    });
  }

  buyIn() {
    this.dialog.open(BuyInDialogComponent,  {
      width: '50%',
      position: {top: '100px'}
    });
  }

  checkOut() {
    this.dialog.open(CheckoutDialogComponent,  {
      width: '50%',
      position: {top: '100px'}
    });
  }
}
