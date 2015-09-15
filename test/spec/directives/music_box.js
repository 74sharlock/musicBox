'use strict';

describe('Directive: musicBox', function () {

  // load the directive's module
  beforeEach(module('musicBoxApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<music-box></music-box>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the musicBox directive');
  }));
});
