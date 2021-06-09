var StaticData = {};
StaticData.pendingUpdates = 0;

var date = nextDay();
function nextDay() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

// StaticData.availableVaccinations = [];
StaticData.onCentreDataRecieved = function (data) {
    // StaticData.availableVaccinations.push(data.centers);
    StaticData.processSessionData(data.centers);
}

StaticData.loadCentersByPincode = function (value, index, array) {
    if (value.distance <= StaticData.range) {
        console.log(value);
        $.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + value.Pincode + "&date=" + date,
            function (json) {
                StaticData.onCentreDataRecieved(json);
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
    console.log("loaded pin codes");
    StaticData.availableVaccinations = [];
    StaticData.allPinCodes.forEach(StaticData.loadCentersByPincode);
};


StaticData.getCentersByPincode = function (range) {
    // update distances
    StaticData.finalOutput = [];
    StaticData.range = range;
    $.getJSON("test.json",
        function (json) {
            StaticData.updateDistances(json.data);
        }
    )
};

StaticData.processSessionData =
    function (data) {
        for (var centre_no = 0; centre_no < data.length; centre_no++) {
            // iterate through centre
            var centre = data[centre_no];
            var address = centre.address + centre.district_name + centre.state_name;
            console.log(address);
            for (var session_no = 0; session_no < centre.sessions.length; session_no++) {
                var obj = {};
                var session = centre.sessions[session_no];
                if (session.available_capacity > 0) {
                    obj.date = session.date;
                    obj.name = centre.name;
                    obj.address = address;
                    obj.available_capacity = session.available_capacity;
                    obj.min_age_limit = session.min_age_limit;
                    obj.fee_type = centre.fee_type;
                    obj.vaccine = session.vaccine;
                    StaticData.finalOutput.push(obj);
                }
            }
        }
        Interface.repaint();
    };
