angular.module('cm2opus').
controller('LoginCtrl', function ($scope, $rootScope, $uibModalInstance, $log, user, AuthService) {
    $scope.$watch('auth_error');
    $scope.submitLoginForm = function (credentials) {
        AuthService.login(credentials).then(function() {
            $scope.cancel();
        }, function () {
            $scope.auth_error = 'Either username or password is not accepted.';
        });
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});