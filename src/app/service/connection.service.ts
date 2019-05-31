import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IConnection } from '../interface/connection.interface';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private connections$: BehaviorSubject<IConnection[]> = new BehaviorSubject<IConnection[]>([]);

  public setConnections(connections: IConnection[]) {
    this.connections$.next(connections);
  }

  public get connections(): Observable<IConnection[]> {
    return this.connections$.asObservable();
  }
  constructor(private http: HttpClient) {
    this.http.get<IConnection[]>(environment.apiUrl).subscribe(connections => {
      this.setConnections(connections);
    });
  }
}
