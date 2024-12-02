import { TestBed } from '@angular/core/testing';

import { SystemUserServiceService } from './system-user-service.service';

describe('SystemUserServiceService', () => {
  let service: SystemUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
