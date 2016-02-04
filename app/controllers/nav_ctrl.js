angular.module('myApp').
controller('NavCtrl', function(contactService, userService, $scope, $log, $http, $httpParamSerializerJQLike, Flash, Auth, $modal, loginService) {
  $log.log("In NavCtrl");
  $log.log("user: " + userService.getUser());
  $scope.$watch(function(){$scope.current_user = userService.getUser();});

  Auth.currentUser().then(function(user) {
    userService.setUser(Auth.currentUser());
    $scope.logout = function(){
  	  loginService.logout(Auth, userService);
    }
    console.log(user); // => {id: 1, ect: '...'}
  }, function(error) {
    $scope.login = function(){
  	  loginService.login($scope, $modal);
    }
  });
});
  