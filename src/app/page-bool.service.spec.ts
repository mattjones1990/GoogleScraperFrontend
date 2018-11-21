import { TestBed } from '@angular/core/testing';

import { PageBoolService } from './page-bool.service';

describe('PageBoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageBoolService = TestBed.get(PageBoolService);
    expect(service).toBeTruthy();
  });
});
