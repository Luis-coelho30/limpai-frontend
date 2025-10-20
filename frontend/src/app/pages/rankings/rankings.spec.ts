import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rankings } from './rankings';

describe('Rankings', () => {
  let component: Rankings;
  let fixture: ComponentFixture<Rankings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rankings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rankings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
