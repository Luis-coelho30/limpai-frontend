import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCampanha } from './criar-campanha';

describe('CriarCampanha', () => {
  let component: CriarCampanha;
  let fixture: ComponentFixture<CriarCampanha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarCampanha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarCampanha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
