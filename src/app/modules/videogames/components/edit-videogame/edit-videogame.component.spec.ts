import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideogameComponent } from './edit-videogame.component';

describe('EditVideogameComponent', () => {
  let component: EditVideogameComponent;
  let fixture: ComponentFixture<EditVideogameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVideogameComponent]
    });
    fixture = TestBed.createComponent(EditVideogameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
