/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TypeRacerService } from './TypeRacer.service';

describe('Service: TypeRacer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeRacerService]
    });
  });

  it('should ...', inject([TypeRacerService], (service: TypeRacerService) => {
    expect(service).toBeTruthy();
  }));
});
