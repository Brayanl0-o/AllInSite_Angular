import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicUpdateComponent } from './music-update.component';

describe('MusicUpdateComponent', () => {
  let component: MusicUpdateComponent;
  let fixture: ComponentFixture<MusicUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicUpdateComponent]
    });
    fixture = TestBed.createComponent(MusicUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
