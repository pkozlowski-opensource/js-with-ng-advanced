angular.module('projectstorage', ['mongolab'])
  .factory('Project', function ($mongolabResource) {
    return $mongolabResource('projects');
  });