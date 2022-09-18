import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllenamentiComponent } from './allenamenti.component';

describe('AllenamentiComponent', () => {
  let component: AllenamentiComponent;
  let fixture: ComponentFixture<AllenamentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllenamentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllenamentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
