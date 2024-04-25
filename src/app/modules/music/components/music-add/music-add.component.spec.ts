import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicAddComponent } from './music-add.component';

describe('MusicAddComponent', () => {
  let component: MusicAddComponent;
  let fixture: ComponentFixture<MusicAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicAddComponent]
    });
    fixture = TestBed.createComponent(MusicAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
