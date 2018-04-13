angular.module('portainer.docker')
.controller('ContainerInspectController', ['$scope', '$transition$', 'Notifications', 'ContainerService', 'Authentication',
function ($scope, $transition$, Notifications, ContainerService, Authentication) {

  $scope.state = {
    DisplayTextView: false
  };
  $scope.containerInfo = {};

  function initView() {
    $scope.isAdmin = isAdminAccess(Authentication);
    ContainerService.inspect($transition$.params().id)
    .then(function success(d) {
      $scope.containerInfo = d;
    })
    .catch(function error(e) {
      Notifications.error('Failure', e, 'Unable to inspect container');
    });
  }

  initView();
}]);
