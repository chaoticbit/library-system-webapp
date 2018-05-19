'use strict';

describe('Controller: BooksCtrl', function () {

  // load the controller's module
  beforeEach(module('projectsApp'));

  var BooksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BooksCtrl = $controller('BooksCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BooksCtrl.awesomeThings.length).toBe(3);
  });
});
