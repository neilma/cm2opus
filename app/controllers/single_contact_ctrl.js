'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp').
controller('SingleContactCtrl', function(contactService, userService, $scope, $log, $http, $httpParamSerializerJQLike, Flash, Auth, $modal, loginService, configVarService) {
  $log.log("In SingleContactCtrl");

  $scope.cmEnvs = [
    {
      name: '212', value: '212'
    },
    {
      name: '211', value: '211'
    },
    {
      name: '210', value: '210'
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
    $log.log($scope.contact.specialty.value);
    $log.log($scope.contact.keyword);
    $log.log($scope.contact.cmEnv.value);
    $log.log(Auth.isAuthenticated());

    if (Auth.isAuthenticated())
    {
      $log.log(Auth.currentUser());
      userService.setUser(Auth.currentUser());
    }
    else {
      return loginService.login($scope, $modal);
    }

    $http({
      url: configVarService.backend_url + '/cm/search_contact?cm_env=' + $scope.contact.cmEnv.value + '&operation=search_contact&format=json',
      method: 'POST',
      data: $httpParamSerializerJQLike(
        {contact_manager: {specialty: $scope.contact.specialty.value, keyword: $scope.contact.keyword}}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function successCallback(response) {
      $log.log("Success");
      $log.log(response.data);
      http_resp_handling(response.data);
      contactService.setOpusEnv('Virtual');
      contactService.setContacts(response.data);

      $log.log("OPUS ENV: " + contactService.getOpusEnv());

      build_contact_table(response.data);
    }, function errorCallback(response) {
      $log.log("Failure");
      $log.log(response.data);
      $log.log(response.statusText);
      Flash.create("warning", "Failed to retrieve contact.");
    });
  };

  var build_contact_table = function(input_contacts) {
    $scope.sortType = 'link_id';
    $scope.sortReverse = false;
  }
  var http_resp_handling = function(input_http_resp) {
    if(input_http_resp.error) {
      Flash.create("warning", "Failed to retrieve contact due to:" + JSON.stringify(input_http_resp.error));
    }
  };
});
