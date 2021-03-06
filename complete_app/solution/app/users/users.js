angular.module('users', ['ngRoute', 'userstorage'])

  .config(function ($routeProvider) {

    $routeProvider

      .when('/users/list', {
        templateUrl: '/static/users/list.html',
        controller: 'UsersListCtrl',
        resolve: {
          users: function (User) {
            return User.getAll();
          }
        }
      })

      .when('/users/edit/new', {
        templateUrl: '/static/users/edit.html',
        controller: 'UserEditCtrl',
        resolve: {
          user: function (User) {
            return new User();
          }
        }
      })

      .when('/users/edit/:id', {
        templateUrl: '/static/users/edit.html',
        controller: 'UserEditCtrl',
        resolve: {
          user: function ($route, User) {
            return User.getById($route.current.params.id);
          }
        }
      });
  })

  .controller('UsersListCtrl', function ($scope, $location, User, users) {

    $scope.users = users;

    $scope.edit = function (user) {
      $location.path('/users/edit/' + user.getId());
    };

    $scope.remove = function (user) {
      user.$remove().then(function () {
        User.getAll().then(function (users) {
          $scope.users = users;
        });
      });
    };
  })

  .controller('UserEditCtrl', function ($scope, $location, user) {

    $scope.save = function () {
      $scope.user.$save().then(function () {
        $location.path('/users/list');
      });
    };

    $scope.hasEdits = function () {
      return !angular.equals($scope.user, $scope.cleanUser);
    };

    $scope.clear = function () {
      $scope.user = angular.copy($scope.cleanUser);
    };

    $scope.cleanUser = user;
    $scope.clear();
  });
