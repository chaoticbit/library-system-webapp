'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the projectsApp
 */
angular.module('projectsApp').controller('ProfileCtrl', function ($rootScope, $scope, $window) {
    $('.list-group-item').removeClass('active');
    $("[aria-tab='profile']").addClass('active');    
});
