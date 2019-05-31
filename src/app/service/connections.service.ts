import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Connection } from '../model/connection.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {
  private connections$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<Connection[]>(environment.apiUrl).subscribe(connections => this.setConnection(connections));
  }

  public setConnection(connections: Connection[]): void {
    this.connections$.next(connections);
  }

  public getConnections(): Observable<Connection[]> {
    return this.connections$.asObservable();
  }
}
