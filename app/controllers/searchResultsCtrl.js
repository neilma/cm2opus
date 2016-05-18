'use strict';

// Declare app level module which depends on views, and components
angular.module('cm2opus').
controller('SearchResultsCtrl', function($cookies, SearchService, ContactService, $scope, $log, $http, $httpParamSerializerJQLike, Flash, ConfigFactory) {
  $log.log("In SearchResultsCtrl");
  $scope.$watch(function(){
    $scope.returned_contacts = ContactService.getContacts();
  });

      $scope.sortType = 'link_id';
      $scope.sortReverse = false;
  $scope.sync = function() {
    $http({
      url: ConfigFactory.backend.url + '/cm/sync_contact?opus_env=' + ContactService.getOpusEnv() + '&format=json',
      method: 'POST',
      data: $httpParamSerializerJQLike(
        {authenticity_token: $cookies.get('auth-session-token'), supplier_data: $scope.returned_contacts})
    }).success(function(data, status, headers, config) {
        SearchService.handleResp('success', 'sync contact', data, true)
    }).error(function(data, status, headers, config) {
      SearchService.handleResp('failure', 'sync contact', data);
    });
  };

  $scope.reset = function() {
    ContactService.setContacts("");
  };
});
