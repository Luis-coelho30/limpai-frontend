import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Empresas } from './empresas';

describe('Empresas', () => {
  let component: Empresas;
  let fixture: ComponentFixture<Empresas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Empresas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Empresas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
