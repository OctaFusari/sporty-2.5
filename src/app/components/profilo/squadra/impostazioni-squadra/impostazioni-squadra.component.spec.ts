import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostazioniSquadraComponent } from './impostazioni-squadra.component';

describe('ImpostazioniSquadraComponent', () => {
  let component: ImpostazioniSquadraComponent;
  let fixture: ComponentFixture<ImpostazioniSquadraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpostazioniSquadraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpostazioniSquadraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
