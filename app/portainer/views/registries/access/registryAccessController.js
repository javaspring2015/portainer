angular.module('portainer.app')
.controller('RegistryAccessController', ['$scope', '$transition$', 'RegistryService', 'Notifications', 'Authentication',
function ($scope, $transition$, RegistryService, Notifications, Authentication) {

  $scope.updateAccess = function(authorizedUsers, authorizedTeams) {
    return RegistryService.updateAccess($transition$.params().id, authorizedUsers, authorizedTeams);
  };

  function initView() {
    $scope.isAdmin = isAdminAccess(Authentication);
	
    RegistryService.registry($transition$.params().id)
    .then(function success(data) {
      $scope.registry = data;
    })
    .catch(function error(err) {
      Notifications.error('Failure', err, 'Unable to retrieve registry details');
    });
  }

  initView();
}]);
