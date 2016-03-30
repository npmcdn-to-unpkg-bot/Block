app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://radiant-inferno-1395.firebaseio.com/tvattstuga/75/users");
    return $firebaseAuth(ref);
  }
]);

// and use it in our controller
app.controller("authCtrl", ["$scope", "Auth", "$location",
  function($scope, Auth, $location) {
    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      $scope.redirect = function(){
        $location.path('/bookedList');
      };
      if (authData) {
        /* $location.path('/bookedList'); */
      } else {
        $location.path('/');
      }
    });

    $scope.login = function () {
      Auth.$authWithPassword('password', {
        email: $scope.email,
        password: $scope.password
      }).then(function(user) {
        $scope.alert.message = '';
      }, function(error) {
        if (error = 'INVALID_EMAIL') {
          console.log('email invalid or not signed up — trying to sign you up!');
          $scope.createUser();
        } else if (error = 'INVALID_PASSWORD') {
          console.log('wrong password!');
        } else {
          console.log(error);
        }
      });
    }

    $scope.removeUser = function() {
      $scope.message = null;
      $scope.error = null;
      Auth.$removeUser({
        email: $scope.email,
        password: $scope.password
      }).then(function() {
        $scope.message = "User removed";
      }).catch(function(error) {
        $scope.error = error;
      });
    };
  }
]);
