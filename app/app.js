'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'ui.bootstrap',
  'flash',
  'ngAnimate',
  'Devise',
  'angular-loading-bar'
]).
config(function($routeProvider, AuthProvider) {
  AuthProvider.loginPath('users/sign_in.json');
  AuthProvider.loginMethod('GET');
  AuthProvider.resourceName('user');
  AuthProvider.logoutPath('users/sigin_in.json');
  AuthProvider.logoutMethod('GET');
}).
service('contactService', function() {
  var returned_contacts = undefined;
  var opus_env = undefined;
  function setContacts(contacts) {
    returned_contacts = contacts;
  }
  function getContacts() {
  	return returned_contacts;
  }
  function setOpusEnv(oe) {
  	opus_env = oe;
  }
  function getOpusEnv() {
  	return opus_env;
  }
  return {
  	getContacts: getContacts,
  	setContacts: setContacts,
  	getOpusEnv: getOpusEnv,
  	setOpusEnv: setOpusEnv
  }
}).
service('userService', function(){
  var logged_in_user = undefined;
  function setUser(user) {
    logged_in_user = user;
  }
  function getUser() {
     return logged_in_user;
  }
  return {
    getUser: getUser,
    setUser: setUser}
}).
service('loginService', function(){
  function login(scope, modal){
  scope.user = {
        username: null,
        password: null
    };

      modal.open({
          templateUrl: 'myModalContent.html',
          backdrop: true,
          windowClass: 'modal',
          scope: scope,
          controller: 'LoginCtrl',
          resolve: {
              user: function () {
                  return scope.user;
              }
          }
      });
  }
  function logout(authService, userService) {
    authService._currentUser = null;
    userService.setUser(null);
    console.log("logged out");
  }
return{
  login: login,
  logout: logout
}
}).
factory('configVarService', function() {
  return {
    "backend_url": 'http://localhost:3000'
  };
});;
