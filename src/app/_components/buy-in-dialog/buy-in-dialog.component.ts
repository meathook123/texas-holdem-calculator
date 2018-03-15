import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { CalculatorService } from '../../_services/calculator.service';

@Component({
  selector: 'app-dialog-buy-in',
  templateUrl: './buy-in-dialog.component.html',
  styleUrls: ['./buy-in-dialog.component.scss']
})
export class BuyInDialogComponent implements OnInit {
  playerName: string;
  constructor(private dialog: MatDialog, private game: CalculatorService) { }

  ngOnInit() {
  }

  submit() {
    if (this.playerName) {
      this.game.reBuyIn(this.playerName);
    }
    this.dialog.closeAll();
  }
}