import { Component, OnInit } from '@angular/core';
import { ConnectionsService } from '../service/connections.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-connections-list',
  templateUrl: './connections-list.component.html',
  styleUrls: ['./connections-list.component.scss']
})
export class ConnectionsListComponent implements OnInit {
  activeConnections$: Observable<any[]>;

  constructor(
    private connectionService: ConnectionsService
  ) {
    this.activeConnections$ = connectionService.getConnections();
  }

  ngOnInit() {
  }

}
