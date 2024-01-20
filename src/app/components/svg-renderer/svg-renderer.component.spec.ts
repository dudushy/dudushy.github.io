import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgRendererComponent } from './svg-renderer.component';

describe('SvgRendererComponent', () => {
  let component: SvgRendererComponent;
  let fixture: ComponentFixture<SvgRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgRendererComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SvgRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
