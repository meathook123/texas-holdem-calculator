import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CalculatorService {
  players = [];
  updateSubject = new BehaviorSubject([]);
  gameOn = false;
  chipSize: number;
  buyinCost: number;

  constructor() {
    this.loadStorage();
  }

  getUpdateEvent() {
    return this.updateSubject.asObservable();
  }

  startNewGame(size: number, cost: number) {
    this.gameOn = true;
    this.chipSize = size;
    this.buyinCost = cost;
    localStorage['size'] = JSON.stringify(this.chipSize);
    localStorage['cost'] = JSON.stringify(this.buyinCost);
  }

  addPlayer(name) {
    const player = _.find(this.players, (p: any) => {
      return p.name === name;
    });
    if (!player) {
      this.players.push({name: name, chips: this.chipSize});
      this.updateSubject.next(this.players);
    }
    this.saveToStorage();
  }

  reBuyIn(playerName) {
    _.each(this.players, (p: any) => {
      if (p.name === playerName) {
        p.chips = Number(p.chips) + 200;
      }
    });
    this.updateSubject.next(this.players);
    this.saveToStorage();
  }

  endGame() {
    this.gameOn = false;
    this.clearStorage();
  }

  saveToStorage() {
    localStorage['players'] = JSON.stringify(this.players);
  }

  loadStorage() {
    this.chipSize = localStorage['size'] ? localStorage['size'] : undefined;
    this.buyinCost = localStorage['cost'] ? localStorage['cost'] : undefined;
    if (this.chipSize && this.buyinCost) {
      this.gameOn = true;
    }
    const players = localStorage['players'] ? localStorage['players'] : undefined;
    if (players) {
      this.players = JSON.parse(players);
      this.updateSubject.next(this.players);
    }
  }

  clearStorage() {
    localStorage['players'] = '';
    localStorage['size'] = '';
    localStorage['cost'] = '';
  }
}