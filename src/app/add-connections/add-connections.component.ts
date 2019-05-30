import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-connections',
  templateUrl: './add-connections.component.html',
  styleUrls: ['./add-connections.component.scss']
})
export class AddConnectionsComponent implements OnInit {
  connections$: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  filteredConnections$: Observable<any[]>;

  constructor(private http: HttpClient) {
    //TODO 5+: spinner progress
    this.connections$ = http.get<any[]>('http://localhost:3000/connections');
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredConnections$ = combineLatest(this.connections$, this.filter$).pipe(
      map(([states, filterString]) => states.filter(
        state => state.name.indexOf(filterString) !== -1 || state.type.indexOf(filterString) !== -1)
      )
    );
  }

  ngOnInit() {
  }

}
