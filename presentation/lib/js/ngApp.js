angular.module('app', ['ngAnimate'])


  //slide:start:jsanimations;
  .controller('FadeJSCtrl', function ($scope) {

    var elToFade = document.getElementById('fadeJS');

    function changeOpacity(opacity, step, stop) {
      elToFade.style.opacity = opacity;
      if (!stop(opacity)) {
        setTimeout(function() {
          changeOpacity(opacity - step, step, stop);
        }, 16);
      }
    }

    $scope.fadeOut = function () {
      changeOpacity(1, 0.01, function(newOpacity){
        return newOpacity <= 0;
      });
    };
    //slide:end:jsanimations;

    $scope.fadeIn = function () {
      changeOpacity(0, -0.01, function(newOpacity) {
        return newOpacity >= 1;
      });
    };
  })

  //slide:start:cssanimations;
  .controller('FadeCssCtrl', function ($scope) {

    var elToFade = angular.element(document.getElementById('fadeCss'));

    $scope.toggle = function () {
      elToFade.toggleClass('active')
    };
  })
  //slide:end:cssanimations;

  //slide:start:nganimations;
  .controller('FadeNgAnimateCtrl', function ($scope) {

    $scope.toggleActive = false;

    $scope.toggle = function () {
      $scope.toggleActive = !$scope.toggleActive;
    };
  })
  //slide:end:nganimations;

  .directive('stopwatch', function ($interval) {
    return function (scope, element, attrs) {

      var totalSecs = parseInt(attrs.stopwatch || 30) * 60;
      var remainingSecs = totalSecs;
      var intervalPromise;

      function pad(num) {
        var s = "000000000" + num;
        return s.substr(s.length - 2);
      }

      function formatRemainingTime(seconds) {
        element.text("00:" + pad(Math.floor(seconds / 60)) + ":" + pad(seconds % 60));
        if (seconds < 5*60) {
          element.css({
            color: 'rgb(255, 0, 0)'
          });
        }
      }

      function countDown(secs) {
        return $interval(function () {
          formatRemainingTime(--secs);
          remainingSecs = secs;
        }, 1000, secs);
      }

      formatRemainingTime(totalSecs);

      //reset the clock
      element.on('dblclick', function () {
        intervalPromise ? $interval.cancel(intervalPromise) : angular.noop();
        intervalPromise = countDown(totalSecs);
      });

      //pause the clock
      element.on('click', function () {
        if (intervalPromise) {
          $interval.cancel(intervalPromise);
          intervalPromise = undefined;
        } else {
          intervalPromise = countDown(remainingSecs);
        }
      });
    }
  })

  .directive('blink', function($interval){
    return {
      restrict: 'EA',
      link: function(scope, element) {

        var visible = true;

        $interval(function(){
          element.css('display', visible ? 'block' : 'none');
          visible = !visible;
        }, 1000);

      }
    }
  });