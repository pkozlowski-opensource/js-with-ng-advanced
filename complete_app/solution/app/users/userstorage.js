angular.module('userstorage', ['mongolab'])
  .factory('User', function ($mongolabResource) {
    return $mongolabResource('users');
  });