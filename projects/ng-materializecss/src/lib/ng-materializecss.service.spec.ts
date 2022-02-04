import { TestBed } from '@angular/core/testing';

import { NgMaterializecssService } from './ng-materializecss.service';

describe('NgMaterializecssService', () => {
  let service: NgMaterializecssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMaterializecssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
