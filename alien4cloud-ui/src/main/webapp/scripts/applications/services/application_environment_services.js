define(function (require) {
  'use strict';

  var modules = require('modules');
  var angular = require('angular');

  modules.get('a4c-applications', ['ngResource']).factory('applicationEnvironmentServices', ['$resource',
    function($resource) {
      // Search for application environments
      var searchEnvironmentResource = $resource('rest/v1/applications/:applicationId/environments/search', {}, {
        'search': {
          method: 'POST',
          isArray: false,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      });

      var getAllEnvironmentsForApplication = function(applicationId) {
        var searchRequestObject = {
          'query': '',
          'from': 0,
          'size': 50
        };
        return this.searchEnvironment({
          applicationId: applicationId
        }, angular.toJson(searchRequestObject), function updateAppEnvSearchResult(result) {
          return result.data.data;
        }).$promise;
      };

      var applicationEnvironmentResource = $resource('rest/v1/applications/:applicationId/environments', {}, {
        'create': {
          method: 'POST',
          isArray: false,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      });

      var applicationEnvironmentMiscResource = $resource('rest/v1/applications/:applicationId/environments/:applicationEnvironmentId', {}, {
        'get': {
          method: 'GET'
        },
        'delete': {
          method: 'DELETE'
        },
        'update': {
          method: 'PUT'
        }
      });

      var applicationEnvironmentTopology = $resource('rest/v1/applications/:applicationId/environments/:applicationEnvironmentId/topology', {}, {
        'get': {
          method: 'GET'
        }
      });

      var envEnumTypes = $resource('rest/v1/enums/environmenttype', {}, {
        'get': {
          method: 'GET',
          cache: true
        }
      });

      /*Users roles on an environment*/
      var manageEnvUserRoles = $resource('rest/v1/applications/:applicationId/environments/:applicationEnvironmentId/roles/users/:username/:role', {}, {
        'addUserRole': {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          params: {
            applicationEnvironmentId: '@applicationEnvironmentId',
            applicationId: '@applicationId',
            username: '@username',
            role: '@role'
          }
        },
        'removeUserRole': {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          params: {
            applicationEnvironmentId: '@applicationEnvironmentId',
            applicationId: '@applicationId',
            username: '@username',
            role: '@role'
          }
        }
      });

      var manageEnvGroupRoles = $resource('rest/v1/applications/:applicationId/environments/:applicationEnvironmentId/roles/groups/:groupId/:role', {}, {
        'addGroupRole': {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          params: {
            applicationEnvironmentId: '@applicationEnvironmentId',
            applicationId: '@applicationId',
            groupId: '@groupId',
            role: '@role'
          }
        },
        'removeGroupRole': {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          params: {
            applicationEnvironmentId: '@applicationEnvironmentId',
            applicationId: '@applicationId',
            groupId: '@groupId',
            role: '@role'
          }
        }
      });

      return {
        'create': applicationEnvironmentResource.create,
        'get': applicationEnvironmentMiscResource.get,
        'delete': applicationEnvironmentMiscResource.delete,
        'update': applicationEnvironmentMiscResource.update,
        'environmentTypeList': envEnumTypes.get,
        'searchEnvironment': searchEnvironmentResource.search,
        'userRoles': manageEnvUserRoles,
        'groupRoles': manageEnvGroupRoles,
        'getAllEnvironments': getAllEnvironmentsForApplication,
        'getTopologyId': applicationEnvironmentTopology.get
      };
    }
  ]);
});
