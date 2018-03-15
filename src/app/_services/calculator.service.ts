import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CalculatorService {
  players = [];
  updateSubject = new BehaviorSubject([]);
  updateResultSubject = new BehaviorSubject([]);
  gameOn = false;
  resultOn = false;
  chipSize: number;
  buyinCost: number;
  results = [];

  constructor() {
    this.loadStorage();
  }

  getUpdateEvent() {
    return this.updateSubject.asObservable();
  }

  getUpdateResultEvent() {
    return this.updateResultSubject.asObservable();
  }

  startNewGame(size: number, cost: number) {
    this.gameOn = true;
    this.chipSize = size;
    this.buyinCost = cost;
    localStorage['gameOn'] = true;
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

  checkOut(playerName, finalChips) {
    const player = _.find(this.players, (p: any) => {
      return p.name === playerName;
    });
    if (player) {
      this.players = _.filter(this.players, (p: any) => {
        return p.name !== player.name;
      });
      const score = Math.round((finalChips - player.chips) / this.chipSize * this.buyinCost * 100) / 100;
      this.results.push({
        name: player.name,
        score: score
      });
      this.updateSubject.next(this.players);
      this.updateResultSubject.next(this.results);
      this.saveToStorage();
    }
  }

  endGame() {
    this.gameOn = false;
    this.resultOn = true;
    this.players = [];
    localStorage['players'] = '';
    localStorage['gameOn'] = '';
    localStorage['resultOn'] = true;
  }

  saveToStorage() {
    localStorage['players'] = JSON.stringify(this.players);
    localStorage['results'] = JSON.stringify(this.results);
  }

  loadStorage() {
    this.chipSize = localStorage['size'] ? localStorage['size'] : undefined;
    this.buyinCost = localStorage['cost'] ? localStorage['cost'] : undefined;
    this.gameOn = localStorage['gameOn'] ? true : false;
    this.resultOn = localStorage['resultOn'] ? true : false;

    const players = localStorage['players'] ? localStorage['players'] : undefined;
    if (players) {
      // this.gameOn = true;
      this.players = JSON.parse(players);
      this.updateSubject.next(this.players);
    }

    const results = localStorage['results'] ? localStorage['results'] : undefined;
    if (results) {
      // this.resultOn = true;
      this.results = JSON.parse(results);
      this.updateResultSubject.next(this.results);
    }
  }

  clearResult() {
    this.resultOn = false;
    this.results = [];
    this.chipSize = undefined;
    this.buyinCost = undefined;
    localStorage['results'] = '';
    localStorage['size'] = '';
    localStorage['cost'] = '';
    localStorage['resultOn'] = '';
  }
}
