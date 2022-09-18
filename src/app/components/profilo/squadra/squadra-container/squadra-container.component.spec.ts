import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadraContainerComponent } from './squadra-container.component';

describe('SquadraContainerComponent', () => {
  let component: SquadraContainerComponent;
  let fixture: ComponentFixture<SquadraContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadraContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadraContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
