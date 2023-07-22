import { TestBed } from '@angular/core/testing';

import { QuizQandansService } from './quiz-qandans.service';

describe('QuizQandansService', () => {
  let service: QuizQandansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizQandansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
