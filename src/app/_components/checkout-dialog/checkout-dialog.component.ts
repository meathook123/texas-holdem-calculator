import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { CalculatorService } from '../../_services/calculator.service';

@Component({
  selector: 'app-dialog-checkout',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.scss']
})
export class CheckoutDialogComponent implements OnInit {
  playerName: string;
  finalChips: number;
  constructor(private dialog: MatDialog, private game: CalculatorService) { }

  ngOnInit() {
  }

  submit() {
    if (this.playerName) {
      this.game.checkOut(this.playerName, this.finalChips);
    }
    this.dialog.closeAll();
  }
}
