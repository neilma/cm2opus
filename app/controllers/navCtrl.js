angular.module('cm2opus').
controller('NavCtrl', function(AuthService, ConfigFactory, LoginService, ContactService, $scope, $uibModal, $log) {
    $log.log("In NavCtrl");
    //$log.log("user: " + userService.getUser());
    $scope.opusUrls = ConfigFactory.opus;
    $scope.ciUrls = ConfigFactory.ci;
    $scope.piUrls = ConfigFactory.pi;
    $scope.cmUrls = ConfigFactory.cm;

    $scope.$watch(function() { $scope.isAuthenticated = AuthService.isAuthenticated(); });
    //$scope.userRoles = USER_ROLES;
    //$scope.isAuthorized = AuthService.isAuthorized;
    //
    //$scope.setCurrentUser = function (user) {
    //  $scope.currentUser = user;
    //};

    $scope.openLogout = function(){
        LoginService.logout();
    }

    $scope.openLogin = function(){
  	    LoginService.login($scope, $uibModal);
    }
  //$scope.$watch(function(){$scope.current_user = userService.getUser();});

  //Auth.currentUser().then(function(user) {
  //  userService.setUser(Auth.currentUser());
  //  $scope.logout = function(){
  //	  loginService.logout(Auth, userService);
  //  }
  //  console.log(user); // => {id: 1, ect: '...'}
  //}, function(error) {
  //  $scope.login = function(){
  //	  loginService.login($scope, $modal);
  //  }
  //});
});
  