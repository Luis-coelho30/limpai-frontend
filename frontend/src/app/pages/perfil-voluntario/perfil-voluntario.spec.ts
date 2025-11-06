import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilVoluntario } from './perfil-voluntario';

describe('PerfilVoluntario', () => {
  let component: PerfilVoluntario;
  let fixture: ComponentFixture<PerfilVoluntario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilVoluntario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilVoluntario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
