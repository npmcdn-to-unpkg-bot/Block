app.factory("Auth", function($firebaseAuth){
  var ref = new Firebase("https://radiant-inferno-1395.firebaseio.com/tvattstuga/75");
  return $firebaseAuth(ref);
});
/*
https://auth.firebase.com/v2.2/radiant-inferno-1395/auth/facebook/callback
https://auth.firebase.com/v2/radiant-inferno-1395/auth/facebook/callback
*/
