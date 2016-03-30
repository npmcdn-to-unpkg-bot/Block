app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://facebookblock.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);

// and use it in our controller
app.controller("authCtrl", ["$scope", "Auth", "$location",
  function($scope, Auth, $location) {
    $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      $scope.redirect = function(){
        $location.path('/welcome');
        console.log(authData.facebook);
      };
      if (authData) {
        /* $location.path('/bookedList'); */
      } else {
        $location.path('/');
      }
    });


  }
]);

app.controller('MainCtrl', function($scope, Facebook) {
  $scope.user = Facebook.getUser(FB);
});

app.service('Facebook', function($q, $rootScope) {

  // resolving or rejecting a promise from a third-party
  // API such as Facebook must be
  // performed within $apply so that watchers get
  // notified of the change
  resolve = function(errval, retval, deferred) {
    $rootScope.$apply(function() {
      if (errval) {
        deferred.reject(errval);
      } else {
        retval.connected = true;
        deferred.resolve(retval);
      }
    });
  }

  return {
    getUser: function(FB) {
      var deferred = $q.defer();
      FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          FB.api('/me', function(response) {
            resolve(null, response, deferred);
          });
        } else if (response.status == 'not_authorized') {
          FB.login(function(response) {
            if (response.authResponse) {
              FB.api('/me', function(response) {
                resolve(null, response, deferred);
              });
            } else {
              resolve(response.error, null, deferred);
            }
          });
        }
      });
      promise = deferred.promise;
      promise.connected = false;
      return promise;
    }
  };
});
