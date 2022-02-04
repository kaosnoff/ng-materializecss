import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMaterializecssComponent } from './ng-materializecss.component';

describe('NgMaterializecssComponent', () => {
  let component: NgMaterializecssComponent;
  let fixture: ComponentFixture<NgMaterializecssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgMaterializecssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMaterializecssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
