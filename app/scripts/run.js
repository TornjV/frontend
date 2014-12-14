'use strict';

module.exports = [
  '$rootScope',
  '$state',
  'authService',
  function appRunPhase($rootScope, $state, authService) {

    function routeChecker(event, next, current) {
      var loggedIn = authService.isLoggedIn();

      if (loggedIn) {
        authService.attachToken(loggedIn);
      }

      if (!loggedIn && !next.public) {
        event.preventDefault();
        $state.go('login');
      }

      if (loggedIn && next.public) {
        event.preventDefault();
      }

    }

    $rootScope.$on('$stateChangeStart', routeChecker);
  }
];
