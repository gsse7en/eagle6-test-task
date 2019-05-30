import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectionsListComponent } from './connections-list/connections-list.component';
import { AddConnectionsComponent } from './add-connections/add-connections.component';

const routes: Routes = [
  { path: '', component: ConnectionsListComponent },
  { path: 'add', component: AddConnectionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
