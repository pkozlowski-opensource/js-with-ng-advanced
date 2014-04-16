angular.module('app', ['ngRoute', 'security', 'users'])

  .constant('MONGOLAB_CONFIG', {
    BASE_URL: '/db/',
    DB_NAME: 'roche'
  })

  .config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.otherwise({
      redirectTo: '/users/list'
    });
  })

  .controller('SignInCtrl', function ($scope, $http, $modalInstance) {

    $scope.user = {};

    $scope.ok = function () {

      $scope.authError = undefined;

      $http.post('/security/signin', $scope.user).then(function (response) {
        $modalInstance.close(response.data);
      }, function (response) {
        $scope.authError = response.data;
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('Sign in process aborted');
    };

  });