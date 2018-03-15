import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { CalculatorService } from '../../_services/calculator.service';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})
export class AddPlayerDialogComponent implements OnInit {
  playerName: string;
  constructor(private dialog: MatDialog, private game: CalculatorService) { }

  ngOnInit() {
  }

  submit() {
    if (this.playerName) {
      this.game.addPlayer(this.playerName);
    }
    this.dialog.closeAll();
  }
}