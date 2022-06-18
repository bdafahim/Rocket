import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelGalleryCardComponent } from './model-gallery-card.component';

describe('ModelGalleryCardComponent', () => {
  let component: ModelGalleryCardComponent;
  let fixture: ComponentFixture<ModelGalleryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelGalleryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelGalleryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
