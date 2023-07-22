import { TestBed } from '@angular/core/testing';

import { QuizQService } from './quiz-q.service';

describe('QuizQService', () => {
  let service: QuizQService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizQService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
