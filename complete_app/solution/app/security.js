angular.module('security', ['ui.bootstrap'])

  .factory('authHttpInterceptor', function ($q, $injector) {

    return {
      responseError: function(response) {

        var pendingRequests = [];
        var futureResult, signInPromise;

        if (response.status === 401) {

          futureResult = $q.defer();

          //remember a request to re-do when an authentication is OK
          pendingRequests.push({
            config: response.config,
            deferred: futureResult
          });

          //open a modal window only if there wasn't one open already
          if (!signInPromise) {

            signInPromise = $injector.get('$modal').open({
              templateUrl: '/static/signin.html',
              controller: 'SignInCtrl'
            }).result;

            signInPromise.then(function() {
              //resolve all the pending request with promises sent from the new $http call
              pendingRequests.forEach(function(pendingRequest){
                pendingRequest.deferred.resolve($injector.get('$http')(pendingRequest.config));
              });
            }, function(reason) {
              //reject all the pending requests
              pendingRequests.forEach(function(pendingRequest){
                pendingRequest.deferred.reject(reason);
              });
            }).finally(function(){
                //final cleanup
                signInPromise = undefined;
                pendingRequests.length = 0;
            });
          }

          //return a promise that will be resolved with an initial call result, but after authentication
          return futureResult.promise;
        }

        //some other error - propagate
        return $q.reject(response);
      }
    };

  })

  .config(function($httpProvider){
    $httpProvider.interceptors.push('authHttpInterceptor');
  });