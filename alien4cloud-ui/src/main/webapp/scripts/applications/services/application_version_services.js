define(function (require) {
  'use strict';

  var modules = require('modules');

  modules.get('a4c-applications', ['ngResource']).factory('applicationVersionServices', ['$resource',
    function($resource) {
      var searchVersionResource = $resource('rest/v1/applications/:delegateId/versions/search', {}, {
        'search': {
          method: 'POST',
          isArray: false,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      });

      var applicationVersionResource = $resource('rest/v1/applications/:delegateId/versions', {}, {
        'create': {
          method: 'POST',
          isArray: false,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        },
        'get': {
          method: 'GET'
        }
      });

      var applicationVersionMiscResource = $resource('rest/v1/applications/:delegateId/versions/:versionId', {}, {
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

      return {
        'getFirst': applicationVersionResource.get,
        'create': applicationVersionResource.create,
        'get': applicationVersionMiscResource.get,
        'delete': applicationVersionMiscResource.delete,
        'update': applicationVersionMiscResource.update,
        'searchVersion': searchVersionResource.search
      };
    }
  ]);
});
