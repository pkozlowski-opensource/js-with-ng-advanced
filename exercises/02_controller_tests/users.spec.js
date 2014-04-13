describe('users controller', function () {

  var $scope;

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope;
    $controller('UsersCtrl', {
      '$scope': $scope
    });
  }));

  it('should initialize scope with an empty users collection', function () {
    expect($scope.user).toEqual({});
    expect($scope.users.length).toEqual(0);
  });

  it('should save a current user and update users list', function () {
  });

  it('should dirty check and allow clearing user edits', function () {
    $scope.user.name = 'bar';
    expect($scope.hasEdits()).toBeTruthy();

    $scope.clear();
    expect($scope.hasEdits()).toBeFalsy();
  });

  it('should remove a selected user', function () {
  });

  it('should support editing users', function () {
  });

});