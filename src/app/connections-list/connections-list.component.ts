import { Component, OnDestroy } from '@angular/core';
import { ConnectionService } from '../service/connection.service';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IConnection } from '../interface/connection.interface';

@Component({
  selector: 'app-connections-list',
  templateUrl: './connections-list.component.html',
  styleUrls: ['./connections-list.component.scss']
})
export class ConnectionsListComponent implements OnDestroy {
  private activeConnections: IConnection[];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private activeConnections$: Observable<IConnection[]>;

  constructor(private connectionService: ConnectionService) {
    this.activeConnections$ = this.connectionService.connections
      .pipe(takeUntil(this.destroyed$));
    this.activeConnections$.subscribe((connections => {
      this.activeConnections = connections;
    }));
  }

  private connectionsLength(): number {
    return this.activeConnections.filter(connection => connection.isActive === true).length;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
