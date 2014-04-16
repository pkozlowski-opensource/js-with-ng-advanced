(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('hello.tpl.html',
    '<span>Hello, {{name}}!</span>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pagination.tpl.html',
    '<ul class="pagination">\n' +
    '    <li ng-class="{disabled: !hasPrevious()}">\n' +
    '        <a href ng-click="selectPage(selectedPage-1)">&laquo;</a>\n' +
    '    </li>\n' +
    '\n' +
    '    <li ng-repeat="pageNumber in pageNumbers"\n' +
    '        ng-class="{active: selectedPage == pageNumber}">\n' +
    '        <a href ng-click="selectPage(pageNumber)">{{pageNumber}}</a>\n' +
    '    </li>\n' +
    '\n' +
    '    <li ng-class="{disabled: !hasNext()}">\n' +
    '        <a href ng-click="selectPage(selectedPage+1)">&raquo;</a>\n' +
    '    </li>\n' +
    '</ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pagination.tpl.html',
    '<ul class="pagination">\n' +
    '    <li ng-class="{disabled: !hasPrevious()}">\n' +
    '        <a href ng-click="selectPage(selectedPage-1)">&laquo;</a>\n' +
    '    </li>\n' +
    '\n' +
    '    <li ng-repeat="pageNumber in pageNumbers"\n' +
    '        ng-class="{active: selectedPage == pageNumber}">\n' +
    '        <a href ng-click="selectPage(pageNumber)">{{pageNumber}}</a>\n' +
    '    </li>\n' +
    '\n' +
    '    <li ng-class="{disabled: !hasNext()}">\n' +
    '        <a href ng-click="selectPage(selectedPage+1)">&raquo;</a>\n' +
    '    </li>\n' +
    '</ul>');
}]);
})();
