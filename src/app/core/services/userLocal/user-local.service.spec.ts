import { TestBed } from '@angular/core/testing';

import { UserLocalService } from './user-local.service';

describe('UserLocalService', () => {
  let service: UserLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
