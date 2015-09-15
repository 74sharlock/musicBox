'use strict';

describe('Service: aps', function () {

  // load the service's module
  beforeEach(module('musicBoxApp'));

  // instantiate service
  var aps;
  beforeEach(inject(function (_aps_) {
    aps = _aps_;
  }));

  it('should do something', function () {
    expect(!!aps).toBe(true);
  });

});
