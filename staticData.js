var StaticData = {};

StaticData.requestCount = 0;

var date = nextDay();
function nextDay() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

StaticData.onCentreDataRecieved = function (data, dis) {
    StaticData.requestCount--;
    console.log("Called: StaticData.onCentreDataRecieved", StaticData.requestCount);
    StaticData.processSessionData(data.centers, dis);
}

StaticData.centerCount = 0;
StaticData.loadCentersByPincode = function (value) {
    if (value.distance <= StaticData.range) {
        StaticData.requestCount++;
        $.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + value.Pincode + "&date=" + date,
            function (json) {
                StaticData.onCentreDataRecieved(json, value.distance);
            });
    }

};


StaticData.allPinCodes = [];
StaticData.updateDistances = function (data) {
    for (i = 0; i < data.length; i++) {
        var pin = {};
        pin.Pincode = data[i].Pincode;
        lat = data[i].Latitude;
        long = data[i].Longitude;
        pin.distance = distance(myLocation.lat, myLocation.long, lat, long, "K");
        StaticData.allPinCodes.push(pin);
    }
    StaticData.availableVaccinations = [];
    StaticData.allPinCodes.forEach(StaticData.loadCentersByPincode);
};


StaticData.getCentersByPincode = function (range) {
    StaticData.requestCount = 0;
    StaticData.finalOutput = [];
    StaticData.range = range;
    $.getJSON("pincodeWithCoord.json",
        function (json) {
            StaticData.updateDistances(json.data);
        }
    )
};

StaticData.processSessionData =
    function (data, dis) {
        console.log("Called: StaticData.processSessionData");
        for (var centre_no = 0; centre_no < data.length; centre_no++) {
            var centre = data[centre_no];
            var address = centre.address + ", " + centre.district_name + ", " + centre.state_name;
            for (var session_no = 0; session_no < centre.sessions.length; session_no++) {
                var obj = {};
                var session = centre.sessions[session_no];
                if (session.available_capacity > 0) {
                    obj.date = session.date;
                    obj.name = centre.name;
                    obj.distance = dis.toFixed(0);
                    obj.pincode = centre.pincode;
                    obj.district = centre.district_name;
                    obj.address = address;
                    obj.available_capacity = session.available_capacity;
                    obj.available_capacity_dose1 = session.available_capacity_dose1;
                    obj.available_capacity_dose2 = session.available_capacity_dose2;
                    obj.min_age_limit = session.min_age_limit;
                    obj.fee_type = centre.fee_type;
                    obj.vaccine = session.vaccine;
                    obj.sessionID = session.session_id;
                    StaticData.finalOutput.push(obj);
                }
            }
        }
        Interface.paintFiltered(Interface.filter_condition);

    };
