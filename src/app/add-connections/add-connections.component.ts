import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConnectionsService } from '../service/connections.service';

@Component({
  selector: 'app-add-connections',
  templateUrl: './add-connections.component.html',
  styleUrls: ['./add-connections.component.scss']
})
export class AddConnectionsComponent implements OnInit {
  connections$: Observable<any[]>;
  connections: any[];
  filter: FormControl;
  filter$: Observable<string>;
  filteredConnections$: Observable<any[]>;

  constructor(
    private connectionService: ConnectionsService
  ) {
    //TODO 5+: spinner progress
    this.connections$ = connectionService.getConnections();
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    // .takeUntil(this.ngUnsubscribe)      // отписаться после разрушения
    // .map(form => form['search-input'])  // данные инпута
    // .distinctUntilChanged()             // брать измененные данные
    // .debounceTime(300)                  // реагировать не сразу
    // .switchMap(this.wikipediaSearch)    // переключить Observable на запрос в Вики
    // .subscribe(data => console.log(data));
    this.filteredConnections$ = combineLatest(this.connections$, this.filter$).pipe(
      map(([states, filterString]) => {
        this.connections = states;
        return states.filter(state => state.name && (state.name.indexOf(filterString) !== -1 || state.type.indexOf(filterString) !== -1));
      })
    );
  }

  ngOnInit() {
  }

  public selectConnection(ids) {
    const activeConnectionsIds = ids.selectedOptions.selected.map(item => item.value);
    const activeConnections = this.connections.map(connection => {
      return {...connection, isActive: activeConnectionsIds.indexOf(connection.id) !== -1};
    });
    this.connectionService.setConnection(activeConnections);
  }

}
