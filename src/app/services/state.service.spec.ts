import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';
import {getLocalStorage} from '../app.module';

describe('StateService', () => {
  let service: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StateService,
        { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }
      ]
    });
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
