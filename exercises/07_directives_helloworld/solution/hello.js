angular.module('helloDirectives', [])

  .directive('hello', function () {
    //ex:start
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        element.text('Hello, ' + attrs.name + '!');
      }
    };
    //ex:end
  })

  .directive('helloTpl', function () {
    //ex:start
    return {
      restrict: 'E',
      template: '<span>Hello, {{name}}!</span>',
      link: function (scope, element, attrs) {
        scope.name = attrs.name;
      }
    };
    //ex:end
  })

  .directive('helloTplUrl', function () {
    //ex:start
    return {
      restrict: 'E',
      templateUrl: 'hello.tpl.html',
      link: function (scope, element, attrs) {
        scope.name = attrs.name;
      }
    };
    //ex:end
  })

  .directive('helloScope', function () {
    //ex:start
    return {
      restrict: 'E',
      templateUrl: 'hello.tpl.html',
      scope: {
        name: '='
      },
      link: function (scope, element, attrs) {
      }
    };
    //ex:end
  });