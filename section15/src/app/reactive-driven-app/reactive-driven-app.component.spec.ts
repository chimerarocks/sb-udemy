import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveDrivenAppComponent } from './reactive-driven-app.component';

describe('ReactiveDrivenAppComponent', () => {
  let component: ReactiveDrivenAppComponent;
  let fixture: ComponentFixture<ReactiveDrivenAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveDrivenAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveDrivenAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
