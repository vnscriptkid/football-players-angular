import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// container
import { PlayerViewerComponent } from './containers/player-viewer/player-viewer.component';
import { PlayerDashboardComponent } from './containers/player-dashboard/player-dashboard.component';
// components
import { PlayerCountComponent } from './components/player-count/player-count.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';

// service
import { PlayerDashboardService } from './player-dashboard.service';

const routes: Routes = [
  {
    path: 'players',
    children: [
      { path: '', component: PlayerDashboardComponent },
      { path: ':id', component: PlayerViewerComponent }
    ]
  }
] 

@NgModule({
  declarations: [
    PlayerDashboardComponent,
    PlayerViewerComponent,
    PlayerCountComponent,
    PlayerDetailComponent,
    PlayerFormComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PlayerDashboardService
  ]
})

export class PlayerDashboardModule {}
