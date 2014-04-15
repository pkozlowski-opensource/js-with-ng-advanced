angular.module('progress', [])


  .config(function($httpProvider){
    $httpProvider.interceptors.push('progressInterceptor');
  });

