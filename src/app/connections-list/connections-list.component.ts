import { Component, OnDestroy } from '@angular/core';
import { ConnectionsService } from '../service/connections.service';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Connection } from '../model/connection.model';

@Component({
  selector: 'app-connections-list',
  templateUrl: './connections-list.component.html',
  styleUrls: ['./connections-list.component.scss']
})
export class ConnectionsListComponent implements OnDestroy {
  private activeConnections: Connection[];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private activeConnections$: Observable<Connection[]>;

  constructor(private connectionService: ConnectionsService) {
    this.activeConnections$ = connectionService.getConnections().pipe(takeUntil(this.destroyed$));
    this.activeConnections$.subscribe((connections => this.activeConnections = connections));
  }

  private connectionsLength(): number {
    return this.activeConnections.filter(connection => connection.isActive === true).length;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
