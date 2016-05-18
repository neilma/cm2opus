angular.module('cm2opus')
.service('ContactService', function() {
    var foundContacts = undefined;
    var opusEnv = undefined;

    this.setContacts = function(contacts) {
        foundContacts = contacts;
    };

    this.getContacts = function() {
        return foundContacts;
    };

    this.setOpusEnv = function(oe) {
        opusEnv = oe;
    };

    this.getOpusEnv = function() {
        return opusEnv;
    };
});
