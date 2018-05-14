import { Player } from './../../models/player.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'player-count',
  template: `
    <div>Player Count: {{ countAvailablePlayers() }} / {{ items?.length }} available</div>
  `
})

export class PlayerCountComponent {
  @Input()
  items: Player[]
  countAvailablePlayers(): number {
    if (!this.items) return 0;
    return this.items.filter((player: Player) => player.isAvailable).length;
  }
}
