import { TestBed, inject } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));

  it('clearurl() tests for different use cases', inject([HttpService], (service: HttpService) => {
    // /loc, /loc#bmark,
    // /#loc#bmark?, /##loc#bmark?
    // #/loc, #/loc#bmark, #/#loc#bmark?,
    // #loc?, #loc#bmark?
    // ##/loc#bmark?, ##/#loc#bmark?
    // ##loc?, ##loc#bmark?
    expect(service).toBeTruthy();
  }));

  it('getRouteEvent() tests', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));

  it('getHomeUrl() tests', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
