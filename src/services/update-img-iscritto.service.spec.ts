import { TestBed } from '@angular/core/testing';

import { UpdateImgIscrittoService } from './update-img-iscritto.service';

describe('UpdateImgIscrittoService', () => {
  let service: UpdateImgIscrittoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateImgIscrittoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
