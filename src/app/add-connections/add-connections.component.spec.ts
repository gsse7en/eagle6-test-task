import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AddConnectionsComponent } from './add-connections.component';

describe('AddConnectionsComponent', () => {
  let component: AddConnectionsComponent;
  let fixture: ComponentFixture<AddConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule
      ],
      declarations: [ AddConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
