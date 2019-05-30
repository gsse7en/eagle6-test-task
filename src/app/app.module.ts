import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

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
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
