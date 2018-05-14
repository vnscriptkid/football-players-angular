import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Player } from '../../models/player.interface';

@Component({
  selector: 'player-detail',
  styleUrls: ['player-detail.component.scss'],
  template: `
    <div *ngIf="isEditing">
      <input
        type="text"
        (input)="handleInputChange(inputElement.value)"
        [value]="detail.name"
        #inputElement
      />
    </div>

    <div *ngIf="!isEditing">
      <span
        class="status"
        [class.is-avaiable]="detail.isAvailable"
      >
      </span>
      {{ detail.name }} - {{ detail.position }}
    </div>

    <div>
      <button (click)="goToView()">View</button>
      <button (click)="handleEditClick()">{{isEditing ? 'DONE' : 'EDIT'}}</button>
      <button (click)="handleRemoveClick()">Remove</button>
    </div>
  `
})

export class PlayerDetailComponent implements OnChanges, OnInit {
  @Input()
  detail: Player;

  @Output()
  remove: EventEmitter<any> = new EventEmitter();

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  isEditing: boolean = false;

  constructor(private router: Router) {}
  
  ngOnInit() {}
  
  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
      // console.log(this.detail);
    }
  }

  handleEditClick() {
    if (this.isEditing) {
      this.change.emit(this.detail);
    }
    this.isEditing = !this.isEditing;
  }

  handleInputChange(value) {
    this.detail.name = value;
  }

  handleRemoveClick() {
    this.remove.emit(this.detail);
  }

  goToView() {
    this.router.navigate([`/players/${this.detail.id}`])
  }
}
