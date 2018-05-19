'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the projectsApp
 */
angular.module('projectsApp').controller('LoginCtrl', function ($rootScope, $scope, $http, $timeout, $location, localStorageService) {
    // $('.form-group input').on('click', function() {
    //     $(this).parent().addClass('is-focused');
    // });
    // $('.form-group input').on('blur', function() {
    //     $(this).parent().removeClass('is-focused');
    // });
    $('body').bootstrapMaterialDesign();    
    var options =  {
        content: "We dont recognize this username or password", // text of the snackbar        
        timeout: 3000, // time in milliseconds after the snackbar autohides, 0 is disabled
        htmlAllowed: true, // allows HTML as content value
        onClose: function(){ } // callback called when the snackbar gets closed.
    }        

    if($rootScope.isLoggedIn) {
        $location.path('/');
    }
    $scope.validUser = true;
    $scope.username = '';
    $scope.password = '';
    $scope.email = '';
    $scope.contact = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zip = '';

    $scope.validateLogin = function() {
        $('.top-progress-linear').show();
        $timeout(function() {
            $http({
                method: 'POST',
                url: $rootScope.apiurl + 'auth/',
                data: {"username": $scope.username, "password": $scope.password},
                headers: {"api_key": "library.v1"} 
            }) .then(function(data) {
                if(data.success) {
                    var userProfile = {
                        token: data.token,
                        u_name: data.user[0].u_name,
                        d_id: data.user[0].d_id,
                        city: data.user[0].City,
                        state: data.user[0].State,
                        zip: data.user[0].zip,
                        phone: data.user[0].phone,
                    };
                    localStorageService.set('userProfile', userProfile);
                    $rootScope.userProfile = localStorageService.get('userProfile');
                    if($rootScope.userProfile) {
                        $rootScope.role = $rootScope.userProfile.d_id;    
                    }
                    $rootScope.isLoggedIn = true;
                    $location.path('/');
                } else {
                    //login failed
                    $scope.username = '';
                    $scope.password = '';
                    $.snackbar(options);
                    $scope.validUser = false;
                    $('#usernameInput').focus();
                }                           
            }, function(error) {
                                  
            }).catch(function(e) {
                                  
            }).finally(function() {
                $('.top-progress-linear').hide();
            });
        }, 500);        
    };

    $scope.validateSignup = function() {
        $http({
            method: 'POST',
            url: $rootScope.apiurl + 'auth/signup',
            data: {"username": $scope.username, "password": $scope.password, "email": $scope.email, "city": $scope.city, "state": $scope.state, "zip": $scope.zip, "phone": $scope.contact},
            headers: {"api_key": "library.v1"} 
        }) .then(function(data) {
            if(data.success) {
                var userProfile = {
                    token: data.token,
                    u_name: data.user[0].u_name,
                    d_id: data.user[0].d_id,
                    city: data.user[0].City,
                    state: data.user[0].State,
                    phone: data.user[0].phone,
                };
                localStorageService.set('userProfile', userProfile);
                $rootScope.userProfile = localStorageService.get('userProfile');
                if($rootScope.userProfile) {
                    $rootScope.role = $rootScope.userProfile.d_id;    
                }
                $rootScope.isLoggedIn = true;
                $location.path('/');
            } else {
                //login failed
                $scope.username = '';
                $scope.password = '';
                $.snackbar(options);
                $scope.validUser = false;
                $('#usernameInput').focus();
            }                           
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            
        });
    };

    $scope.disableLoginCheck = function() {
        if($.trim($scope.username) == "" || $.trim($scope.password) == "") {            
            return true;
        } else {            
            return false;
        }
    }

    $('.toggle-signup').on('click', function() {
        $('.head-label h2').text('Sign Up');
        $('.go-back-login').show();
        $('.signup-parent-row').hide();
        $('.fgt-pwd').fadeOut(100);     
        $('#usernameInput').focus();   
        $('.hdn-group').slideDown(300, function() {            
            $('.btn-login').fadeOut(100, function() {
                $('.btn-signup').show();
            });            
        });
    });

    $('.go-back-login').on('click', function() {
        $('.head-label h2').text('Welcome Back!');
        $('.go-back-login').hide();        
        $('.fgt-pwd').fadeIn(100);
        $('.hdn-group').slideUp(300, function() {            
            $('.btn-signup').fadeOut(100, function() {
                $('.btn-login').show();                
            });
            $('#usernameInput').focus();
            $('.signup-parent-row').show();
        });        
    });
});
