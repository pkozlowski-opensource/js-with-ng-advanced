angular.module('taskstorage', ['mongolab'])
  .factory('Task', function ($mongolabResource) {
    return $mongolabResource('tasks');
  });