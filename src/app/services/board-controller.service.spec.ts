import { TestBed } from '@angular/core/testing';

import { BoardControllerService } from './board-controller.service';

describe('BoardControllerService', () => {
  let service: BoardControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
