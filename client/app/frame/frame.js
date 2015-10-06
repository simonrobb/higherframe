'use strict';

angular
	.module('siteApp')
  .config(function ($stateProvider) {

    $stateProvider
      .state('frame', {
        url: '/frame/:id',
        templateUrl: 'app/frame/frame.html',
        controller: 'FrameCtrl',
				controllerAs: 'FrameCtrl',
        resolve: {
          frame: function($stateParams, $http, $q, Auth) {

            var deferred = $q.defer();

            $http({
							url: '/api/frames/' + $stateParams.id,
							headers: {
								'Authorization': 'Bearer ' + Auth.getToken()
							}
						})
              .success(function (frame) {


                deferred.resolve(frame);
              })
              .error(function () {

                deferred.reject();
              });

             return deferred.promise;
          },
					$title: function(frame) { return frame.name; }
        }
      });
  });
