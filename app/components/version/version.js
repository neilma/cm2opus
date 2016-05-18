'use strict';

angular.module('cm2opus.version', [
  'cm2opus.version.interpolate-filter',
  'cm2opus.version.version-directive'
])

.value('version', '0.1');
