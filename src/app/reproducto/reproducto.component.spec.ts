import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproductoComponent } from './reproducto.component';

describe('ReproductoComponent', () => {
  let component: ReproductoComponent;
  let fixture: ComponentFixture<ReproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
