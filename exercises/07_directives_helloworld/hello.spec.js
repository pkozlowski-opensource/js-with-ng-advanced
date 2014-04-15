ddescribe('hello world directives', function () {

  var $scope, $compile;

  beforeEach(module('helloDirectives'));
  beforeEach(module('templates'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('imperative version', function () {

    it('should say hello to the World', function () {

      var helloLinkFn = $compile('<hello name="World"></hello>');
      var helloEl = helloLinkFn($scope);

      expect(helloEl.text()).toEqual('Hello, World!');
    });

  });

  describe('declarative version with a template', function () {

    it('should say hello to the World', function () {

      var helloEl = $compile('<hello-tpl name="World"></hello-tpl>')($scope);
      $scope.$digest();

      expect(helloEl.text()).toEqual('Hello, World!');
    });

  });

  describe('declarative version with a template url', function () {

    it('should say hello to the World', function () {

      var helloEl = $compile('<hello-tpl-url name="World"></hello-tpl-url>')($scope);
      $scope.$digest();

      expect(helloEl.text()).toEqual('Hello, World!');
    });

  });

  describe('declarative version with an isolated scope', function () {

    it('should say hello to the World', function () {

      $scope.worldName = 'World';
      var helloEl = $compile('<hello-scope name="worldName"></hello-scope>')($scope);
      $scope.$digest();

      expect(helloEl.text()).toEqual('Hello, World!');
    });

    it('should update text in response to scope changes', function () {

      var helloEl = $compile('<hello-scope name="worldName"></hello-scope>')($scope);
      $scope.$digest();
      expect(helloEl.text()).toEqual('Hello, !');

      $scope.worldName = 'World';
      $scope.$digest();
      expect(helloEl.text()).toEqual('Hello, World!');
    });

  });

});