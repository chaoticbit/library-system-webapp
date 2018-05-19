'use strict';

/**
 * @ngdoc overview
 * @name projectsApp
 * @description
 * # projectsApp
 *
 * Main module of the application.
 */
var app = angular
  .module('projectsApp', [
	'ngAnimate',
	'ngAria',
	'ngCookies',
	'ngMessages',
	'ngResource',
	'ngRoute',
	'ngSanitize',    
    'LocalStorageModule',
    'ngMaterial',
    'md.data.table'
  ]);
  app.config(function ($routeProvider, $httpProvider, localStorageServiceProvider) {        
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/books', {
        templateUrl: 'views/books.html',
        controller: 'BooksCtrl',
        controllerAs: 'books'
      })
      .when('/publisher', {
        templateUrl: 'views/publisher.html',
        controller: 'PublisherCtrl',
        controllerAs: 'publisher'
      })
      .when('/library', {
        templateUrl: 'views/library.html',
        controller: 'LibraryCtrl',
        controllerAs: 'library'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .otherwise({
        redirectTo: '/'
      });

      localStorageServiceProvider.setPrefix('library-system');

      /**	   
	   * Custom http interceptors	   
	   */
	 $httpProvider.interceptors.push(function($q, $rootScope) {
		return {

			'request': function(config) {
				return config;
			},

			'requestError': function(rejection) {
				return $q.reject(rejection);
			},

			'response': function(response) {				
				/* if it is not an internal angular request then unwrap the response data  */
				if(_.isObject(response.data)) {
					return response.data;
				}
				else {
					// forward internal angular response
					
					return response;
				}
			},

			'responseError': function(rejection) {
				if(rejection.status == -1){
					console.log('generic internet/server error');
					return $q.reject(rejection);
				}
				else{ // if custom API error
				   return rejection;
				}
			}
		};
	});
  });

  app.run(function($rootScope, $timeout, $window, $location, $http, localStorageService) {    
    $rootScope.notifications = [];
    $rootScope.apiurl = "http://localhost:3000/api/";    
    $rootScope.isLoggedIn = (localStorageService.length() == 0) ? false : true;    
    // $rootScope.isLoggedIn = true;
    $rootScope.sidebarAnimated = false;
    $rootScope.userProfile = localStorageService.get('userProfile');
    if($rootScope.userProfile) {
        $rootScope.role = $rootScope.userProfile.d_id;    
    }
    $rootScope.$on('$locationChangeStart', function(event, currentRoute, prevRoute) {                        
        $('body').removeClass('noscroll');
        var currentRoute = $location.path();
        
        if (currentRoute.substring(1) === 'login') {
            $('body').addClass('login-bg');
        } else {
            $('body').removeClass('login-bg');
        }                        
        
        if($rootScope.isLoggedIn){
              //do something
        }else{
            $location.path('/login');
        }
    });  

    $rootScope.getNotifications = function() {
        $http({
            method: 'GET',
            url: $rootScope.apiurl + 'user/notifications',
            headers: {"api_key": "library.v1","token": $rootScope.userProfile.token} 
        }) .then(function(data) {
            $rootScope.notifications = data.results;                                   
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            $('.notification-loader').hide();
        });
    };    

    $rootScope.logout = function() {
        $rootScope.isLoggedIn = false;   
        localStorageService.remove('userProfile');                 
        $window.location.reload();        
    };

    $(document).on('click','.list-group-item', function() {
        if(!$('.list-group-item[aria-tab="notifications"]')) {
            $('.list-group-item').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('#notificationsModal').on('show.bs.modal', function (e) {            
        $('.notification-loader').show();
        $timeout(function() {
            $rootScope.getNotifications();       
        }, 500);         
    });    
});
