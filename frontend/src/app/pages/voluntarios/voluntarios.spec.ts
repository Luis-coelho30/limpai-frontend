import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Voluntarios } from './voluntarios';

describe('Voluntarios', () => {
  let component: Voluntarios;
  let fixture: ComponentFixture<Voluntarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Voluntarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Voluntarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
