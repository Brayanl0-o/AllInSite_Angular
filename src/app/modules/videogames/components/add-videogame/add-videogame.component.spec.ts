import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideogameComponent } from './add-videogame.component';

describe('AddVideogameComponent', () => {
  let component: AddVideogameComponent;
  let fixture: ComponentFixture<AddVideogameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVideogameComponent]
    });
    fixture = TestBed.createComponent(AddVideogameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
