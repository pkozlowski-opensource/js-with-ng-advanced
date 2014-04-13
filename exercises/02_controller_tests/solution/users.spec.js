//slide:start:test;
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
    //ex:start
    $scope.user = {name : 'foo'};

    $scope.save();

    expect($scope.users.length).toEqual(1);
    expect($scope.user).toEqual({});
    //ex:end
  });
  //slide:end:test;

  it('should dirty check and allow clearing user edits', function () {
    $scope.user.name = 'bar';
    expect($scope.hasEdits()).toBeTruthy();

    $scope.clear();
    expect($scope.hasEdits()).toBeFalsy();
  });

  it('should remove a selected user', function () {
    //ex:start
    $scope.users = [{id: 1, name: 'foo'}];

    $scope.remove($scope.users[0].id);
    expect($scope.users.length).toEqual(0);
    //ex:end
  });

  it('should support editing users', function () {
    //ex:start
    $scope.users = [{id: 1, name: 'foo'}];

    $scope.edit($scope.users[0]);

    expect($scope.user.name).toEqual('foo');
    //ex:end
  });

});