import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, ReplaySubject } from 'rxjs';
import { map, startWith, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ConnectionsService } from '../service/connections.service';
import { Connection } from '../model/connection.model';

@Component({
  selector: 'app-add-connections',
  templateUrl: './add-connections.component.html',
  styleUrls: ['./add-connections.component.scss']
})
export class AddConnectionsComponent implements OnDestroy {
  connections$: Observable<Connection[]>;
  connections: Connection[];
  filter: FormControl;
  filter$: Observable<string>;
  filteredConnections$: Observable<Connection[]>;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private connectionService: ConnectionsService
  ) {
    this.connections$ = connectionService.getConnections();
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(
      startWith(''),
      takeUntil(this.destroyed$),
      debounceTime(400),
      distinctUntilChanged()
    );
    this.filteredConnections$ = combineLatest(this.connections$, this.filter$).pipe(
      map(([states, filterString]) => {
        this.connections = states;
        return states.filter(state => state.name
          && (state.name.indexOf(filterString) !== -1
          || state.type.indexOf(filterString) !== -1)
        );
      }), takeUntil(this.destroyed$)
    );
  }

  public selectConnection(ids: any): void {
    const activeConnectionsIds = ids.selectedOptions.selected.map(item => item.value);
    const activeConnections = this.connections.map(connection => {
      return {...connection, isActive: activeConnectionsIds.indexOf(connection.id) !== -1};
    });
    this.connectionService.setConnection(activeConnections);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
