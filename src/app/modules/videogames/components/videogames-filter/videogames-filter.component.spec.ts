import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogamesFilterComponent } from './videogames-filter.component';

describe('VideogamesFilterComponent', () => {
  let component: VideogamesFilterComponent;
  let fixture: ComponentFixture<VideogamesFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideogamesFilterComponent]
    });
    fixture = TestBed.createComponent(VideogamesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
