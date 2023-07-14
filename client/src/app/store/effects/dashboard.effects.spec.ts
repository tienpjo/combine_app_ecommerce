import { TestBed } from '@angular/core/testing';

import { dashboardEffects } from './dashboard.effects';

describe('DashboardService', () => {
  let service: dashboardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(dashboardEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
