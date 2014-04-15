angular.module('bs.accordion', [])

  .controller('BsAccordionController', function ($scope) {

    $scope.panels = [];

  })

  .directive('bsAccordion', function () {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'accordion.tpl.html',
      transclude: true,
      replace: true,
      controller: 'BsAccordionController'
    };
  })

  .directive('bsCollapse', function () {
    return {
      restrict: 'E',
      templateUrl: 'collapse.tpl.html',
      transclude: true,
      replace: true,
      scope: {
        heading: '@'
      },
      require: '^bsAccordion',
      link: function (scope, iElement, iAttrs, accordionCtrl) {


        //remove this panel from accordion when panel's element gets destroyed
        scope.$on('$destroy', function () {
          accordionCtrl.removePanel(scope);
        });
      }
    };
  });