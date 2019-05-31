import { Component, OnInit } from '@angular/core';
import { ConnectionsService } from '../service/connections.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-connections-list',
  templateUrl: './connections-list.component.html',
  styleUrls: ['./connections-list.component.scss']
})
export class ConnectionsListComponent implements OnInit {
  activeConnections: any[];

  constructor(
    private connectionService: ConnectionsService
  ) {
    connectionService.getConnections().subscribe((connections => this.activeConnections = connections));
  }

  ngOnInit() {
  }

  private connectionsLength() {
    return this.activeConnections.filter(connection => connection.isActive === true).length;
  }

}
