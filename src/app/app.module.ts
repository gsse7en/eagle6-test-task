import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionsListComponent } from './connections-list/connections-list.component';
import { AddConnectionsComponent } from './add-connections/add-connections.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionsListComponent,
    AddConnectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
