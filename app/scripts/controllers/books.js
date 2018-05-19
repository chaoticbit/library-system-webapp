'use strict';

/**
 * @ngdoc function
 * @name projectsApp.controller:BooksCtrl
 * @description
 * # BooksCtrl
 * Controller of the projectsApp
 */
angular.module('projectsApp').controller('BooksCtrl', function ($rootScope, $scope, $timeout, $http, $window, $sce) {    
    
    var token = $rootScope.userProfile.token;     
    $('.list-group-item').removeClass('active');
    $("[aria-tab='books']").addClass('active');    
    
    $scope.query = {
        order: 'title',
        limit: 10,
        page: 1
    };        

    $scope.book = {};
    $scope.publication_date = new Date();
    $scope.selected = [];
    $scope.listOfBooks = [];
    $scope.bookcopy = {};
    $scope.listOfLibraries = [];

    function getAllBooks() {
        $('.showbox').show();
        $timeout(function() {
            $http({
                method: 'GET',
                url: $rootScope.apiurl + 'books/',
                headers: {"api_key": "library.v1","token": token} 
            }) .then(function(data) {
                $scope.listOfBooks = data.results;                              
            }, function(error) {
                                  
            }).catch(function(e) {
                                  
            }).finally(function() {
                $('.showbox').hide();
            });
        }, 500);        
    }

    getAllBooks();
    $scope.getAllBooks = getAllBooks;

    $('#newBookModal').on('show.bs.modal', function (e) {        
        $scope.totalBooks = $scope.listOfBooks.length;
        getPublishers();
        $scope.book = {};        
    });
    $('#newBookModal').on('hidden.bs.modal', function (e) {        
        getAllBooks();        
    });    
    
    $('#bookCopyModal').on('show.bs.modal', function (e) {
        getLibrary();
        $scope.bookcopy.title = $scope.selected[0].title;
        $scope.bookcopy.Book_ID = $scope.selected[0].Book_ID;
        $scope.bookcopy.C_ID = '';
        $scope.bookcopy.Lib_ID = '';
    });

    $scope.titleToLower = function() {
        return $scope.listOfBooks.reverse();
    }

    $scope.deleteBook = function() {
        alert($scope.selected[0].Book_ID);
    };

    $scope.showProgress = function() {
        $('.top-progress-linear').show();
        $timeout(function() {
            $('.top-progress-linear').hide();
        }, 700);
    };

    function getPublishers() {
        $http({
            method: 'GET',
            url: $rootScope.apiurl + 'publishers/',
            headers: {"api_key": "library.v1","token": token} 
        }) .then(function(data) {
            $scope.listOfPublishers = data.results;                              
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            
        });
    }

    function getLibrary() {
        $http({
            method: 'GET',
            url: $rootScope.apiurl + 'library/',
            headers: {"api_key": "library.v1","token": token} 
        }) .then(function(data) {
            $scope.listOfLibraries = data.results;                                          
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            
        });
    }
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

    $scope.saveBook = function() {
        $scope.book.publication_date = formatDate($scope.publication_date);
        
        $http({
            method: 'POST',
            url: $rootScope.apiurl + 'books/new/',
            data: $scope.book,
            headers: {"api_key": "library.v1","token": token} 
        }) .then(function(data) {
            if(data.success) {
                $('#newBookModal').modal('hide');                
            }                           
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            
        });
    };

    $scope.borrowBook = function($index, bookId, C_ID, Lib_ID) {
        var borrow = {
            bookId: bookId,
            C_ID: C_ID,
            Lib_ID: Lib_ID
        };        
        $http({
            method: 'POST',
            url: $rootScope.apiurl + 'books/borrow/',
            data: borrow,
            headers: {"api_key": "library.v1","token": token} 
        }) .then(function(data) {
            if(data.success) {
                $scope.listOfBooks[$index].borrowed = 1;
            }                           
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            
        });
    }
    
    $scope.reserveBook = function($index, bookId, C_ID, Lib_ID) {
        var reserve = {
            bookId: bookId,
            C_ID: C_ID,
            Lib_ID: Lib_ID
        };        
        $http({
            method: 'POST',
            url: $rootScope.apiurl + 'books/reserve/',
            data: reserve,
            headers: {"api_key": "library.v1","token": token} 
        }) .then(function(data) {
            if(data.success) {
                $scope.listOfBooks[$index].is_reserved = 1;
            }                           
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            
        });
    }

    $scope.saveBookCopy = function() {
        console.log($scope.bookcopy);
        
        $http({
            method: 'POST',
            url: $rootScope.apiurl + 'books/copy/',
            data: $scope.bookcopy,
            headers: {"api_key": "library.v1","token": token} 
        }) .then(function(data) {
            if(data.success) {
                if(data.success) {
                    $('#bookCopyModal').modal('hide');  
                    $.snackbar({content: "Book copy of " + $scope.bookcopy.title + " has been added.",timeout: 3000});              
                } else {
                    $.snackbar({content: "Something went wrong. Try again!",timeout: 3000});              
                }
            }                           
        }, function(error) {
                              
        }).catch(function(e) {
                              
        }).finally(function() {
            
        });
    }    
});
