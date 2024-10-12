import { TestBed } from '@angular/core/testing';

import { WorkingService } from './working.service';

describe('WorkingService', () => {
  let service: WorkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
