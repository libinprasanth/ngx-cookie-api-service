import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGXCookieAPIComponent } from './ngxcookie-api.component';

describe('NGXCookieAPIComponent', () => {
  let component: NGXCookieAPIComponent;
  let fixture: ComponentFixture<NGXCookieAPIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NGXCookieAPIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGXCookieAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
