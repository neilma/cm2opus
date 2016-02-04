angular.module('myApp').
controller('LoginCtrl', function ($scope, $modalInstance, $log, user, Auth, userService) {
  var auth = function(modalInstance) {
    Auth.login(user).then(function(expected_user) { 
      if (isAuthed(expected_user, user)) {
        $log.log("authentication successful");
        userService.setUser(user);
        console.log($scope.current_user);
        modalInstance.dismiss('cancel');
      }
      else {
        $log.log("authentication failed");
        Auth._currentUser = null;
        userService.setUser(null);
        $scope.auth_error = 'Either username or password is not accepted.';
      }
    }, function(error){
      $log.log("authentication error");
      Auth._currentUser = null;
      $scope.auth_error = 'Either username or password is not accepted.';
    });
  };

  $scope.submitLoginForm = function () {
    $log.log('Submitting user info: ' + user.username);
    $scope.$watch('auth_error');
    auth($modalInstance);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  var isAuthed = function(white_list, actual_user) {
    var match = false;
    for (var i = 0; i < white_list.length; i++) {
      if (white_list[i].username == actual_user.username && white_list[i].password == actual_user.password) {
        match = true;
        break;
      }
    }
    return match;
  }
});