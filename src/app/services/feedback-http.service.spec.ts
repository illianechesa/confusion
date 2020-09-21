import { TestBed } from '@angular/core/testing';

import { FeedbackHttpService } from './feedback-http.service';

describe('FeedbackHttpService', () => {
  let service: FeedbackHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
