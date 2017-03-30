/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChimerJobComponent } from './chimer-job.component';

describe('ChimerJobComponent', () => {
  let component: ChimerJobComponent;
  let fixture: ComponentFixture<ChimerJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChimerJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChimerJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
