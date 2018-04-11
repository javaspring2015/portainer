angular.module('portainer.app')
.controller('MainController', ['$scope', '$cookieStore', 'StateManager',
function ($scope, $cookieStore, StateManager) {

  /**
  * Sidebar Toggle & Cookie Control
  */
  var mobileView = 992;
  $scope.getWidth = function() {
    return window.innerWidth;
  };

  $scope.applicationState = StateManager.getState();

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
    if (newValue >= mobileView) {
      if (angular.isDefined($cookieStore.get('toggle'))) {
        $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
      } else {
        $scope.toggle = true;
      }
    } else {
      $scope.toggle = false;
    }

  });

  $scope.toggleSidebar = function() {
    $scope.toggle = !$scope.toggle;
    $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
    $scope.$apply();
  };
}]);

function isAdminAccess(Authentication) {
  var userDetails = Authentication.getUserDetails();
  var isAdmin = userDetails.role === 1 ? true: false;
  return isAdmin;
}
