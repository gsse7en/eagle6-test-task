import { Component, ElementRef, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, ReplaySubject } from 'rxjs';
import { map, startWith, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSelectionList } from '@angular/material/list';

import { ConnectionService } from '../service/connection.service';
import { IConnection } from '../interface/connection.interface';

@Component({
  selector: 'app-add-connections',
  templateUrl: './add-connections.component.html',
  styleUrls: ['./add-connections.component.scss']
})
export class AddConnectionsComponent implements OnDestroy, OnInit {
  private connections$: Observable<IConnection[]>;
  private connections: IConnection[];
  private filter: FormControl;
  private filter$: Observable<string>;
  private filteredConnections$: Observable<IConnection[]>;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  @ViewChild('filterRef') filterRef: ElementRef;

  constructor(
    private connectionService: ConnectionService
  ) {
    this.connections$ = this.connectionService.connections;
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
        filterString = filterString.trim().toLowerCase();
        return states.filter(state => (
          this.filterHelperFn(state.name, filterString)
          || this.filterHelperFn(state.type, filterString))
        );
      }), takeUntil(this.destroyed$)
    );
  }

  ngOnInit() {
    this.filterRef.nativeElement.focus();
  }

  private selectConnection(ids: MatSelectionList): void {
    const activeConnectionsIds = ids.selectedOptions.selected.map(item => item.value);
    const activeConnections = this.connections.map(connection => {
      return { ...connection, isActive: activeConnectionsIds.indexOf(connection.id) !== -1 };
    });
    this.connectionService.setConnections(activeConnections);
  }

  private filterHelperFn(searchedText: string, query: string): boolean {
    return searchedText.toLowerCase().indexOf(query) !== -1;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
