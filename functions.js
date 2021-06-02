$(document).ready(function () {
   console.log("ready!");
   // StaticData.isLoadComplete();  //Page Loaded Completely
   initGeolocation();
   // StaticData.load();
   StaticData.getSessionByDistrict(50,14,56);
   toGetDistrict();
});

$(window).on("load resize ", function() {
   var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
   $('.tbl-header').css({'padding-right':scrollWidth});
 }).resize();


function initGeolocation() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, fail);
   }
   else {
      alert("Sorry, your browser does not support geolocation services.");
   }
}


var myLocation = {};
function success(position) {
   myLocation.long = position.coords.longitude;
   myLocation.lat = position.coords.latitude;
}


function fail() {
   console.log("Could'nt get the location");
}

//Still In Working
function toGetDistrict(){ //long = myLocation.long,lat = myLocation.lat
   $("#current_location").text("DISTRICT");
   
   // return "DISTRICT";

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




