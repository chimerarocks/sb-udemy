import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDrivenAppComponent } from './template-driven-app.component';

describe('TemplateDrivenAppComponent', () => {
  let component: TemplateDrivenAppComponent;
  let fixture: ComponentFixture<TemplateDrivenAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDrivenAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDrivenAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
