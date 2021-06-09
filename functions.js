$(document).ready(function () {
   console.log("ready!");
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
   StaticData.getCentersByPincode(600);
   
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



