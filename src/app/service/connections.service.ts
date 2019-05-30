import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {
  private connections$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<any[]>('http://localhost:3000/connections').subscribe(connections => this.setConnection(connections));
  }

  public setConnection(connections: any[]) { //TODO: make model
    this.connections$.next(connections);
  }

  public getConnections() {
    return this.connections$.asObservable();
  }
}
