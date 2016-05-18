'use strict';

// Declare app level module which depends on views, and components
angular.module('cm2opus', [
    'ngRoute',
    'cm2opus.version',
    'ui.bootstrap',
    'ngFlash',
    'ngAnimate',
    'angular-loading-bar',
    'ngCookies'
  ]).
config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/report', {
    templateUrl: 'views/report.html',
    controller: 'ReportCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
});
//.constant('AUTH_EVENTS', {
//    loginSuccess: 'auth-login-success',
//    loginFailed: 'auth-login-failed',
//    logoutSuccess: 'auth-logout-success',
//    sessionTimeout: 'auth-session-timeout',
//    notAuthenticated: 'auth-not-authenticated',
//    notAuthorized: 'auth-not-authorized'
//});
