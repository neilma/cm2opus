'use strict';

// Declare app level module which depends on views, and components
angular.module('cm2opus').
controller('SingleContactCtrl', function($cookies, $uibModal, ContactService, SearchService, $scope, $log, $http, $httpParamSerializerJQLike, Flash, LoginService, ConfigFactory, AuthService) {
  $log.log("In SingleContactCtrl");

  $scope.cmEnvs = [
    {
      name: '211', value: '211'
    },
    {
      name: '210', value: '210'
    },
    {
      name: '212', value: '212'
    },
    {
      name: 'sysA', value: 'sysA'
    }
  ];

  $scope.specialties = [
    {
      value: 'Home_Service_Provider'
    }
  ];

  $scope.search = function(contact) {
    if (AuthService.isAuthenticated() != true)
      return LoginService.login($scope, $uibModal);
    $http({
      url: ConfigFactory.backend.url + '/cm/search_contact?cm_env=' + $scope.contact.cmEnv.value + '&operation=search_contact&format=json',
      method: 'POST',
      data: $httpParamSerializerJQLike(
        {authenticity_token: $cookies.get('auth-session-token'), contact_manager: {specialty: $scope.contact.specialty.value, keyword: $scope.contact.keyword}}),
    }).then(function successCallback(response) {
      SearchService.handleResp('success', 'retrieve contact', response);
      ContactService.setOpusEnv($scope.contact.cmEnv.value);
      ContactService.setContacts(response.data);
      //build_contact_table();
    }, function errorCallback(response) {
        SearchService.handleResp('failure', 'retrieve contact', response);
    });
  };

  var build_contact_table = function() {
    $scope.sortType = 'link_id';
    $scope.sortReverse = false;
  };
});
