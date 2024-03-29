'use strict';

angular.module('siteApp')
  .controller('LoginCtrl', function ($scope, Auth, $state, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.emailAddressFocus = true;
    $scope.passwordFocus = false;

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $state.go('dashboard.projects');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
