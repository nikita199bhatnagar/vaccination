var StaticData = {};
StaticData.pendingUpdates = 0;

StaticData.isLoadComplete =
    function () {
        if (this.pendingUpdates == 0) {
            return true;
        }
        return false;
    };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
StaticData.load =
    function () {
        this.loadDistrictList();
        console.log("Static Data load function call");
    };


StaticData.allDistricts = [];
StaticData.loadDistrictList =
    function () {

        $.get("https://cdn-api.co-vin.in/api/v2/admin/location/states",
            function (data, textStatus, jqXHR) {
                states = data.states;
                console.log('status: ' + textStatus + ', data:' + data);
                for (var i = 0; i < states.length; i++) {
                    var state_id = states[i].state_id;
                    StaticData.pendingUpdates++;
                    $.get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + state_id,
                        function (data, textStatus, jqXHR) {
                            StaticData.pendingUpdates--;
                            districts = data.districts;
                            StaticData.allDistricts = StaticData.allDistricts.concat(districts);
                        });
                }
            });
    };


StaticData.centerData = {};
StaticData.getSessionByDistrict =
    function (distance, myLat, myLong) {
        StaticData.centerData.allCenters = [];
        StaticData.centerData.allCentersByDistrict = [];

        $.getJSON("34.651.json", function (json) {
            var district = {};
            district.districtID = 651;
            district.centers = json.centers;
            StaticData.centerData.allCenters = StaticData.centerData.allCenters.concat(json.centers);
            StaticData.centerData.allCentersByDistrict = StaticData.centerData.allCentersByDistrict.concat(district);
            $.getJSON("200.json", function (json) {
                var district = {};
                district.districtID = 200;
                district.centers = json.centers;
                StaticData.centerData.allCenters = StaticData.centerData.allCenters.concat(json.centers);
                StaticData.centerData.allCentersByDistrict = StaticData.centerData.allCentersByDistrict.concat(district);

                $.getJSON("20.json", function (json) {
                    var district = {};
                    district.districtID = 20;
                    district.centers = json.centers;
                    StaticData.centerData.allCenters = StaticData.centerData.allCenters.concat(json.centers);

                    StaticData.centerData.allCentersByDistrict = StaticData.centerData.allCentersByDistrict.concat(district);

                    Interface.repaint();
                });
            });
        });
    };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var date = nextDay();
function nextDay() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}



StaticData.session = {};
StaticData.getVal_50 = {};
StaticData.getVal_50.date = [];
StaticData.getVal_50.sessions = [];
StaticData.getCentersByPincode =
    function () {
        // $.getJSON("pincodeWithCoord.json",
        $.getJSON("test.json",
            function (json) {
                data = json.data;
                
                for (i = 0; i < data.length; i++) {
                    lat = data[i].Latitude;
                    long = data[i].Longitude;
                    var dis = distance(myLocation.lat, myLocation.long, lat, long, "K");
                    console.log(dis);
                    if (Math.abs(dis) <= 100) {
                        $.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + data[i].Pincode + "&date=" + date,
                            function (data) {
                                centers = data.centers;
                                for (j = 0; j < centers.length; j++) {
                                    for (k = 0; k < centers[j].sessions.lenght; k++) {
                                        if (centers[j].sessions[k].available_capacity > 0) {
                                            StaticData.getVal_50.date[k] = centers[j].sessions[k].date;
                                            address = centers[j].address + centers[j].district_name + centers[j].state_name;
                                            var obj = {};
                                            obj.name = centers[j].name;
                                            obj.address = address;
                                            obj.distance = dis;
                                            obj.availability = centers[j].sessions[k].available_capacity;
                                            obj.age = centers[j].sessions[k].min_age_limit;
                                            obj.price = centers[j].fee_type;
                                            StaticData.getVal_50.sessions[k] = obj;
                                            console.log(StaticData.getVal_50);
                                        }
                                    }
                                }
                            });
                    }
                    if (Math.abs(dis) >= 100 && Math.abs(dis) <= 200) {
                        $.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + data[i].Pincode + "&date=" + date,
                            function (data) {
                                centers = data.centers;
                                for (j = 0; j < centers.length; j++) {
                                    for (k = 0; k < centers[j].sessions.lenght; k++) {
                                        if (centers[j].sessions[k].available_capacity > 0) {
                                            StaticData.getVal_50.date[k] = centers[j].sessions[k].date;
                                            address = centers[j].address + centers[j].district_name + centers[j].state_name;
                                            var obj = {};
                                            obj.name = centers[j].name;
                                            obj.address = address;
                                            obj.distance = dis;
                                            obj.availability = centers[j].sessions[k].available_capacity;
                                            obj.age = centers[j].sessions[k].min_age_limit;
                                            obj.price = centers[j].fee_type;
                                            StaticData.getVal_50.sessions[k] = obj;

                                        }
                                    }
                                }

                            });
                    }
                    if (Math.abs(dis) >= 200 && Math.abs(dis) <= 500) {
                        $.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + data[i].Pincode + "&date=" + date,
                            function (data) {
                                centers = data.centers;
                                for (j = 0; j < centers.length; j++) {
                                    for (k = 0; k < centers[j].sessions.lenght; k++) {
                                        if (centers[j].sessions[k].available_capacity > 0) {
                                            StaticData.getVal_50.date[k] = centers[j].sessions[k].date;
                                            address = centers[j].address + centers[j].district_name + centers[j].state_name;
                                            var obj = {};
                                            obj.name = centers[j].name;
                                            obj.address = address;
                                            obj.distance = dis;
                                            obj.availability = centers[j].sessions[k].available_capacity;
                                            obj.age = centers[j].sessions[k].min_age_limit;
                                            obj.price = centers[j].fee_type;
                                            StaticData.getVal_50.sessions[k] = obj;

                                        }
                                    }
                                }

                            });
                    }
                }
            }
        );
    };



