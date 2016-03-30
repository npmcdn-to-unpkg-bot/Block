/*
app.controller("ProfileCtrl", ["$scope", "Profile",
  function($scope, Profile) {
    // put our profile in the scope for use in DOM
    $scope.profile = Profile("physicsmarie");

    // calling $save() on the synchronized object syncs all data back to our database
    $scope.saveProfile = function() {
      $scope.newBooking.$save().then(function() {
        alert('Profile saved!');
      }).catch(function(error) {
        alert('Error!');
      });
    };
  }
]);


app.controller("fbCtrl", ["$scope", "bookedFB",
  function($scope, bookedFB) {
    // put our profile in the scope for use in DOM
    $scope.profile = bookedFB("physicsmarie");

    // calling $save() on the synchronized object syncs all data back to our database
    $scope.saveBooking = function() {
      $scope.profile.$save().then(function() {
        alert('Profile saved!');
      }).catch(function(error) {
        alert('Error!');
      });
    };
  }
]); */
app.controller('listCtrl', ["$scope", "$firebaseArray",
  function($scope, $firebaseArray){
    var ref = new Firebase("https://radiant-inferno-1395.firebaseio.com/tvattstuga/75/");
    var fbObj = $firebaseArray(ref);
    $scope.booked = fbObj;
    console.log(fbObj)
    /*$scope.dateExists = function(){
      if (fbObj.date != null) {
          return true;
      } else {
        return false;
      };
    }; */
  }
]);

app.controller('fbCtrl', function($scope, datetimepicker, fbService, $location, $firebase) {
  $scope.AddBooking = function (){
    if ($scope.newBooking.name != undefined && $scope.newBooking.bookingTime != undefined
      && $scope.newBooking.bookingEnd != undefined && $scope.newBooking.bookingEnd != undefined) {
      var d = new Date($scope.newBooking.bookingTime);
      var weekday = new Array(7);
      weekday[0]=  "Söndag";
      weekday[1] = "Måndag";
      weekday[2] = "Tisdag";
      weekday[3] = "Onsdag";
      weekday[4] = "Torsdag";
      weekday[5] = "Fredag";
      weekday[6] = "Lördag";

    // date formatting...
      var name = $scope.newBooking.name;
      var date = $scope.newBooking.bookingTime.slice(0,10);
      var sweDay = weekday[d.getDay($scope.newBooking.bookingTime)];
      var start = $scope.newBooking.bookingTime.slice(-5);
        var hh = $scope.newBooking.bookingEnd.getHours();
        var mm = $scope.newBooking.bookingEnd.getMinutes();
        if (mm === 0 ) { mm = "00"; }
      var end = hh + ":" + mm;
        var t1 = moment(start, "HH:mm");
        var t2 = moment(end, "HH:mm");
        var diffCal = moment(t2.diff(t1)).format("HH:mm");
      var duration = diffCal.replace(":", "h")+"m";
      // passing variables to service
      fbService.AddBooking(name, date, sweDay, start, end, duration);
      // redirection back home
        $scope.goUrl = "/";
    } else {
      // stay on page, unable to return via save btn
      $scope.goUrl = "#";
      validate();
      function validate (){
        if ($scope.newBooking.name == undefined && $scope.newBooking.bookingTime == undefined) {
          console.log("Namn och tid saknas");
          $scope.validation = 'Har du fyllt i namn och tid?';
        } else if ($scope.newBooking.bookingTime == undefined){
          $scope.validation = 'Har du fyllt i tid?';
          console.log("Tid saknas");
        } else if ($scope.newBooking.name == undefined){
          $scope.validation = 'Har du fyllt i namn?';
          console.log("Namn saknas");
        } else if (booked) {

        };
      };


    }
  };
});


/*app.controller('bookedListController', function ($scope, bookingMgmt, datetimepicker, $location, $firebase) {
  init();
  var booked = [];
  var time = null;
    function init() {
        $scope.booked = bookingMgmt.getBooked();
        $scope.newBooking = "";
    }
  $scope.insertBooked = function () {
    if ($scope.newBooking.name != undefined && $scope.newBooking.bookingTime != undefined && $scope.newBooking.bookingEnd != undefined && $scope.newBooking.bookingEnd != undefined) {
    // getting swedish weekday
      var d = new Date($scope.newBooking.bookingTime);
      var weekday = new Array(7);
      weekday[0]=  "Söndag";
      weekday[1] = "Måndag";
      weekday[2] = "Tisdag";
      weekday[3] = "Onsdag";
      weekday[4] = "Torsdag";
      weekday[5] = "Fredag";
      weekday[6] = "Lördag";
    // date formatting...
      var name = $scope.newBooking.name;
      var date = $scope.newBooking.bookingTime.slice(0,10);
      var sweDay = weekday[d.getDay($scope.newBooking.bookingTime)];
      var start = $scope.newBooking.bookingTime.slice(-5);
        var hh = $scope.newBooking.bookingEnd.getHours();
        var mm = $scope.newBooking.bookingEnd.getMinutes();
        if (mm === 0 ) { mm = "00"; }
      var end = hh + ":" + mm;
        var t1 = moment(start, "HH:mm");
        var t2 = moment(end, "HH:mm");
        var diffCal = moment(t2.diff(t1)).format("HH:mm");
      var duration = diffCal.replace(":", "h")+"m";
    // passing variables to service
      bookingMgmt.insertBooked(name, date, sweDay, start, end, duration);
    // redirection
      $scope.goUrl = "/";
    } else {
      $scope.goUrl = "#";
      validate();
      function validate (){
        if ($scope.newBooking.name == undefined && $scope.newBooking.bookingTime == undefined) {
          console.log("Namn och tid saknas");
          $scope.validation = 'Har du fyllt i namn och tid?';
        } else if ($scope.newBooking.bookingTime == undefined){
          $scope.validation = 'Har du fyllt i tid?';
          console.log("Tid saknas");
        } else if ($scope.newBooking.name == undefined){
          $scope.validation = 'Har du fyllt i namn?';
          console.log("Namn saknas");
        } else if (booked) {
        };
      };
    }
  };
});
*/
