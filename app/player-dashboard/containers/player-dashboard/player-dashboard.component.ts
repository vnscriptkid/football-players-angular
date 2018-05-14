import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { Player } from '../../models/player.interface'
import { PlayerDashboardService } from '../../player-dashboard.service';

@Component({
  selector: 'player-dashboard',
  styleUrls: ['player-dashboard.component.scss'],
  template: `
    <div>
      <h1>Player Dashboard</h1>

      <player-count
        [items]="players"
      ></player-count>

      <div
        *ngFor="let player of players"
      >{{ player.name }}</div>

      <player-detail
        *ngFor="let player of players"
        [detail]="player"
        (remove)="handlePlayerRemove($event)"
        (change)="handlePlayerChange($event)"
      ></player-detail>

    </div>
  `
})

export class PlayerDashboardComponent implements OnInit {
  players: Player[];
  constructor(private playerService: PlayerDashboardService) {}

  ngOnInit() {
    this.playerService
    .getPlayers()
    .subscribe((data: Player[]) => {
      this.players = data;
    });
  }

  handlePlayerRemove(event) {
    this.playerService.removePlayer(event).subscribe((data) => {
      console.log('data returned from remove service: ', data);
      this.players = this.players.filter((player: Player) => {
        return player.id !== event.id
      });
    })
  }

  handlePlayerChange(event) {
    this.playerService
      .updatePlayer(event)
      .then((data: Player) => {
        this.players = this.players.map((player: Player) => {
          if (player.id === event.id) {
            return Object.assign({}, player, {name: event.name});
          }
          return player;
        })
      })
  }
}
