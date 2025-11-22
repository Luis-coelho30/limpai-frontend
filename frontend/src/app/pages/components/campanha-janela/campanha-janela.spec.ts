import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanhaJanela } from './campanha-janela';

describe('CampanhaJanela', () => {
  let component: CampanhaJanela;
  let fixture: ComponentFixture<CampanhaJanela>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampanhaJanela]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampanhaJanela);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
