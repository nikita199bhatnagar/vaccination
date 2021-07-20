$(document).ready(function () {
   initGeolocation();
});

var myLocation = {};
function initGeolocation() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, fail);
   }
   else {
      alert("Sorry, your browser does not support geolocation services.");
   }
}

function success(position) {
   myLocation.long = position.coords.longitude;
   myLocation.lat = position.coords.latitude;
   StaticData.getCentersByPincode(25);
}

function fail() {
   console.log("Could'nt get the location");
}

function distance(lat1, lon1, lat2, lon2, unit) {
   if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
   }
   else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
         dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 } //Kilometers
      if (unit == "N") { dist = dist * 0.8684 }  //Nautical Miles
      return dist;
   }
}

$("#all").on("click", function () {
   $('.dd option').prop('selected', function () {
      return this.defaultSelected;
   });
});

// function handlePermission() {
//    navigator.permissions.query({name:'geolocation'}).then(function(result) {
//      if (result.state == 'granted') {
//        report(result.state);
//        geoBtn.style.display = 'none';
//      } else if (result.state == 'prompt') {
//        report(result.state);
//        geoBtn.style.display = 'none';
//        navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
//      } else if (result.state == 'denied') {
//        report(result.state);
//        geoBtn.style.display = 'inline';
//      }
//      result.onchange = function() {
//        report(result.state);
//      }
//    });
//  }

//  function report(state) {
//    console.log('Permission ' + state);
//  }

//  handlePermission();

navigator.geolocation.getCurrentPosition(function (position) {
   // alert('allow');
}, function () {
   alert('Please grant location access to make the site work');
   $('#myModal').modal("show");
  
      // $('#alertbox').click(function () {
      //    $("#error").html("You Clicked on Click here Button");
         
      // });


});

