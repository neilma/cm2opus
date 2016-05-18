angular.module('cm2opus')
.service('LoginService', function($cookies){
    this.login = function(scope, modal){
        modal.open({
            templateUrl: 'views/login_form.html',
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
    };

    this.logout = function() {
        $cookies.remove('auth-session-token');
        console.log("logged out");
    };
});
