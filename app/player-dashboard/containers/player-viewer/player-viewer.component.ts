import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Player } from '../../models/player.interface';
import { PlayerDashboardService } from '../../player-dashboard.service';

@Component({
    selector: 'player-viewer',
    styleUrls: ['player-viewer.component.scss'],
    template: `
        <div>
            <button (click)="goBack()">Go back</button>
            <player-form (update)="handlePlayerUpdate($event)" [player]="player"></player-form>
        </div>
        `
})

export class PlayerViewerComponent implements OnInit {
    player: Player;

    constructor(
        private playerService: PlayerDashboardService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe((data: any) => {
            this.playerService.getPlayer(data.id).subscribe(data => {
                this.player = data;
            })
        });
    }

    handlePlayerUpdate(event) {
        console.log('from view: ', event);
        this.playerService.updatePlayer(event).then(data => {
            this.player = Object.assign({}, data);
            console.log('updated: ',this.player);
        })
    }

    goBack() {
        this.router.navigate(['/players']);
    }
}