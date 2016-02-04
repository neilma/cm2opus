'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp').
controller('SearchResultsCtrl', function(contactService, $scope, $log, $http, $httpParamSerializerJQLike, Flash, configVarService) {
  $log.log("In SearchResultsCtrl");
  $scope.$watch(function(){$scope.returned_contacts = contactService.getContacts();});

  $scope.sync = function() {
    $log.log($scope.returned_contacts);
    $http({
      url: configVarService.backend_url + '/cm/sync_contact?opus_env=' + contactService.getOpusEnv() + '&format=json',
      method: 'POST',
      data: $httpParamSerializerJQLike(
        {supplier_data: $scope.returned_contacts}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      resp_handling(data);
      // contactService.returned_contacts = data;
    }).error(function(data, status, headers, config) {
      resp_handling(data);
    });
  };

  $scope.reset = function() {
    $log.log("Reset search results");
    contactService.setContacts("");
  };
  var resp_handling = function(input_resp) {
      $log.log(input_resp);
      Flash.create("success", "Synchronization results:" + JSON.stringify(input_resp));
    };
});
