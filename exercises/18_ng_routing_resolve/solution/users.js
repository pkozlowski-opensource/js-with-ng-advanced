angular.module('usersNgRouteResolve', ['userstorageHttpResource'])

  //slide:start:inject;
  .controller('UsersListCtrl', function ($scope, $location, User, users) {

    $scope.users = users;
    
    $scope.edit = function (user) {
      $location.path('/users/edit/' + user.getId());
    };
    //slide:end:inject;

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