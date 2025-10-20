import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guia } from './guia';

describe('Guia', () => {
  let component: Guia;
  let fixture: ComponentFixture<Guia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Guia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
