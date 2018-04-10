angular.module('portainer.docker')
.controller('EventsController', ['$scope', 'Notifications', 'SystemService', 'Authentication',
function ($scope, Notifications, SystemService, Authentication) {

  function initView() {
	$scope.isAdmin = isAdminRole(Authentication);
	
    var from = moment().subtract(24, 'hour').unix();
    var to = moment().unix();

    SystemService.events(from, to)
    .then(function success(data) {
      $scope.events = data;
    })
    .catch(function error(err) {
      Notifications.error('Failure', err, 'Unable to load events');
    });
  }

  initView();
}]);
