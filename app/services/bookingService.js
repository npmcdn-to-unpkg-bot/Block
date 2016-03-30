
app.service('fbService', function (){

  this.addBooking = function (name,date,sweDay,start,end,duration,fullDate, fullEnd) {

      var fbRef = new Firebase("https://radiant-inferno-1395.firebaseio.com/tvattstuga/75");

      var randomId = Math.round(Math.random() * 100000000);
      var firebaseRef = new Firebase("https://radiant-inferno-1395.firebaseio.com/tvattstuga/75/"+fullDate);

//      fbRef.child("duration").on("value", function(snapshot) {
//        console.log(snapshot.val());
//      });

      firebaseRef.set({
        name: name,
        date: date,
        day: sweDay,
        start: start,
        end: end,
        duration: duration,
        fullEnd: fullEnd
      }, function(error) {
        if (error) {
          console.log("Error:", error);
        } else
          console.log("Slot saved to DB!");

      });

  };
});
