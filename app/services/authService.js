angular.module('cm2opus')
.service('AuthService', function ($http, ConfigFactory, $httpParamSerializerJQLike, $cookies) {
    this.login = function (credentials) {
        credentials.remember_me = 0;
        return $http({
            url: ConfigFactory.backend.url + '/users/sign_in?format=json',
            method: 'POST',
            data: $httpParamSerializerJQLike({'user': credentials})})
            .then(function (res) {
                $cookies.put('auth-session-token', res.data.authenticity_token);
                return res.data;
            });
    };

    this.isAuthenticated = function () {
        return !!$cookies.get('auth-session-token');
    };

    this.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };
});