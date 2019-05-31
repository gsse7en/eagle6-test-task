import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ConnectionService } from './connection.service';

describe('ConnectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ConnectionService = TestBed.get(ConnectionService);
    expect(service).toBeTruthy();
  });
});
