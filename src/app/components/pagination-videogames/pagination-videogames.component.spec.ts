import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationVideogamesComponent } from './pagination-videogames.component';

describe('PaginationVideogamesComponent', () => {
  let component: PaginationVideogamesComponent;
  let fixture: ComponentFixture<PaginationVideogamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationVideogamesComponent]
    });
    fixture = TestBed.createComponent(PaginationVideogamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
