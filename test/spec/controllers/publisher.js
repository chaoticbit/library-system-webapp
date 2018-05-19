'use strict';

describe('Controller: PublisherCtrl', function () {

  // load the controller's module
  beforeEach(module('projectsApp'));

  var PublisherCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublisherCtrl = $controller('PublisherCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PublisherCtrl.awesomeThings.length).toBe(3);
  });
});
