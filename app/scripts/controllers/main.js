'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projectsApp
 */
angular.module('projectsApp').controller('MainCtrl', function ($rootScope, $scope, $http) {
    var token = $rootScope.userProfile.token;        
    $scope.results = {};    

    $('.list-group-item').removeClass('active');
    $("[aria-tab='home']").addClass('active');

    $scope.query = {
        order: 'title',
        limit: 5,
        page: 1
    };

    $scope.selectedBorrowed = [];
    $scope.selectedReserved = [];
    $('.showbox').show();
    function getDashboardData() {
        $http({
            method: 'GET',
            url: $rootScope.apiurl + 'user/dashboard',
            headers: {"api_key": "library.v1","token": token} 
        }) .then(function(data) {
            $scope.results = data.results;                              
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            $('.showbox').hide();
        });
    }

    getDashboardData();

    $scope.returnBook = function($index, bookId, C_ID, Lib_ID) {
        $('.top-progress-linear').show();
        var obj = {
            Book_ID: bookId,
            Lib_ID: Lib_ID,
            C_ID: C_ID
        };        
        $http({
            method: 'POST',
            url: $rootScope.apiurl + 'books/return/',
            data: obj,
            headers: {"api_key": "library.v1","token": token} 
        }) .then(function(data) {
            if(data.success) {
                if(data.success) {                    
                    getDashboardData();                    
                } else {
                    $.snackbar({content: "Something went wrong. Try again!",timeout: 3000});              
                }
            }                           
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            $('.top-progress-linear').hide();
        });
    };

});
