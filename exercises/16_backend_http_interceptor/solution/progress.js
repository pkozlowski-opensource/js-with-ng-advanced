angular.module('progress', [])

  //ex:start
  //slide:start:interceptor;
  .factory('progressInterceptor', function ($q, $rootScope) {

    var pendingRequestsCount = 0;

    return {
      request : function(config) {
        pendingRequestsCount++;
        $rootScope.httpInProgress = pendingRequestsCount > 0;
        return config;
      },
      requestError : function(rejectionReason) {
        //do nothing - if a request failed we don't need to show any progress bar
        return $q.reject(rejectionReason);
      },
      response : function (response) {
        pendingRequestsCount--;
        $rootScope.httpInProgress = pendingRequestsCount > 0;
        return response;
      },
      responseError : function(rejectionReason) {
        pendingRequestsCount--;
        $rootScope.httpInProgress = pendingRequestsCount > 0;
        return $q.reject(rejectionReason);
      }
    };
  })
  //slide:end:interceptor;
  //ex:end

  //slide:start:register;
  .config(function($httpProvider){
    $httpProvider.interceptors.push('progressInterceptor');
  });
  //slide:end:register;

