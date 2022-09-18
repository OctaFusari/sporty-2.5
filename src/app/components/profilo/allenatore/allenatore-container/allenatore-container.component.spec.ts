import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllenatoreContainerComponent } from './allenatore-container.component';

describe('AllenatoreContainerComponent', () => {
  let component: AllenatoreContainerComponent;
  let fixture: ComponentFixture<AllenatoreContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllenatoreContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllenatoreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
