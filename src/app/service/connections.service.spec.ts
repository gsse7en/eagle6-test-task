import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ConnectionsService } from './connections.service';

describe('ConnectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ConnectionsService = TestBed.get(ConnectionsService);
    expect(service).toBeTruthy();
  });
});
