'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:LibraryCtrl
 * @description
 * # LibraryCtrl
 * Controller of the projectsApp
 */
angular.module('projectsApp').controller('LibraryCtrl', function ($rootScope, $scope, $timeout, $http, $window) {
    var token = $rootScope.userProfile.token; 

    // $('body').bootstrapMaterialDesign();    
    $('.list-group-item').removeClass('active');
    $("[aria-tab='library']").addClass('active');    

    $scope.query = {
        order: 'l_name',
        limit: 10,
        page: 1
    };

    $scope.lib = {};
    $scope.selected = [];
    $scope.listOfLibraries = [];
    
    function getLibrary() {
        $('.showbox').show();
        $timeout(function() {    
            $http({
                method: 'GET',
                url: $rootScope.apiurl + 'library/',
                headers: {"api_key": "library.v1","token": token} 
            }) .then(function(data) {
                $scope.listOfLibraries = data.results;                                          
            }, function(error) {
                                  
            }).catch(function(e) {
                                  
            }).finally(function() {
                $('.showbox').hide();
            });
        }, 500);    
    }  

    getLibrary();
    $scope.getLibrary = getLibrary;
    $('#newLibraryModal').on('show.bs.modal', function (e) {                        
        $scope.lib = {};        
    });
    $('#newLibraryModal').on('hidden.bs.modal', function (e) {        
        getLibrary();
    });    

    $scope.saveLibrary = function() {        
        $http({
            method: 'POST',
            url: $rootScope.apiurl + 'library/new/',
            data: $scope.lib,
            headers: {"api_key": "library.v1","token": token} 
        }) .then(function(data) {
            if(data.success) {
                $('#newLibraryModal').modal('hide');                
            }                           
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            
        });
    };
    
});
