angular.module('cm2opus')
.service('SearchService', function(Flash, $log){
      this.handleResp = function(flag, action, resp, alertOnSuccess) {
          $log.log(flag + ' ' + action + ' resp: ' + resp);
          if(flag == 'failure') {
              $log.log(resp.statusText);
              Flash.create('warning',
                  'Failed to ' + action + ' due to:' + resp.status + ' ' + resp.statusText + ' ' + resp.data);
          }
          else {
              if (alertOnSuccess == true)
                  Flash.create('success', action + ' successfully.' +  JSON.stringify(resp));
          }
      }
});
