'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:PublisherCtrl
 * @description
 * # PublisherCtrl
 * Controller of the projectsApp
 */
angular.module('projectsApp').controller('PublisherCtrl', function ($rootScope, $scope, $timeout, $http, $window) {
    var token = $rootScope.userProfile.token; 

    // $('body').bootstrapMaterialDesign();    
    $('.list-group-item').removeClass('active');
    $("[aria-tab='publisher']").addClass('active');    

    $scope.query = {
        order: 'title',
        limit: 10,
        page: 1
    };

    $scope.publisher = {};
    $scope.selected = [];
    $scope.listOfPublishers = [];
    
    function getPublishers() {
        $('.showbox').show();
        $timeout(function() {    
            $http({
                method: 'GET',
                url: $rootScope.apiurl + 'publishers/',
                headers: {"api_key": "library.v1","token": token} 
            }) .then(function(data) {
                $scope.listOfPublishers = data.results;                              
            }, function(error) {
                                  
            }).catch(function(e) {
                                  
            }).finally(function() {
                $('.showbox').hide();
            });
        }, 500);    
    }    
    
    $scope.getPublishers = getPublishers;

    $('#newPublisherModal').on('show.bs.modal', function (e) {
        $scope.totalPublishers = $scope.listOfPublishers.length;        
        $scope.publisher = {};        
    });

    $('#newPublisherModal').on('hidden.bs.modal', function (e) {        
        getPublishers();        
    });  

    getPublishers();

    $scope.titleToLower = function() {
        return $scope.listOfPublishers.reverse();
    }

    $scope.deletePublisher = function() {
        alert($scope.selected[0].P_ID);
    };

    $scope.savePublisher = function() {        
        $http({
            method: 'POST',
            url: $rootScope.apiurl + 'publishers/new/',
            data: $scope.publisher,
            headers: {"api_key": "library.v1","token": token} 
        }) .then(function(data) {
            if(data.success) {
                $('#newPublisherModal').modal('hide');                
            }                           
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            
        });
    };

});
