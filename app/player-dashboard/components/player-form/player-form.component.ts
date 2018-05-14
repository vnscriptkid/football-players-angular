import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Player } from '../../models/player.interface';
import { Level } from '../../models/player.interface';

@Component({
    selector: 'player-form',
    styleUrls: ['player-form.component.scss'],
    template: `
        <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" ngSubmit novalidate>
            <div>
                <div>
                    Player Name:
                    <input 
                        type="text"
                        name="name"
                        required
                        [ngModel]="player?.name"
                        #name="ngModel"
                    >
                    <div *ngIf="name.errors?.required && name.dirty" class="error">
                        Name field is required
                    </div>
                </div>
                <div>
                    Player Number:
                    <input 
                        type="number"
                        name="number"
                        [ngModel]="player?.number"
                        #num="ngModel"
                        required
                    >
                    <div class="error" *ngIf="num.errors?.required && num.dirty">
                        Number field is required
                    </div>
                </div>
                Available:
                <label>
                    <input
                        type="radio"
                        [value]="true"
                        name="isAvailable"
                        [ngModel]="player?.isAvailable"
                    >
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        [value]="false"
                        name="isAvailable"
                        [ngModel]="player?.isAvailable"
                    >
                    No
                </label>
                <div>
                    <select
                        name="level"
                        [ngModel]="player?.level"
                    >
                        <option
                            *ngFor="let item of levels"
                            [value]="item.type"
                        >
                            {{ item.type | uppercase }}
                        </option>
                    </select>
                </div>
                <button type="submit" [disabled]="form.invalid">
                    Update Player
                </button>
            </div>
        </form>
    `
})

export class PlayerFormComponent {
    @Input()
    player: Player;

    @Output()
    update: EventEmitter<Player> = new EventEmitter<Player>();

    levels: Level[] = [{
        type: 'senior'
    },{
        type: 'professional'
    },{
        type: 'newbie'
    },{
        type: 'young player'
    }];

    handleSubmit(form: Player, isValid: boolean) {
        // console.log('handle submit');
        if (isValid) {
            console.log('form: ',form);
            let updated = Object.assign({}, this.player, form);
            console.log('emit this: ', updated);
            this.update.emit(updated);
        }
    } 
}