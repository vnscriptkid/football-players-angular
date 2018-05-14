import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Player } from './models/player.interface';

const PLAYER_API: string = '/api/players';

@Injectable()
export class PlayerDashboardService {
    constructor(private http: Http) {
      console.log(this.http);
    }

    getPlayer(id): Observable<Player> {
      return this.http
        .get(`${PLAYER_API}/${id}`)
        .map(response => response.json())
        .catch((error: any) => Observable.throw(error.json()));
    } 

    getPlayers(): Observable<Player[]> {
        return this.http
        .get(PLAYER_API)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()));
    }

    updatePlayer(player): Promise<Player> {
      const headers = new Headers({
        "Content-Type": "application/json"
      })
      const options = new RequestOptions({
        headers: headers
      }) 
      return this.http
        .put(`${PLAYER_API}/${player.id}`, player, options)
        .toPromise()
        .then((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()));
    }

    removePlayer(player: Player): Observable<any> {
      return this.http
        .delete(`${PLAYER_API}/${player.id}`)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()))
    }
}
