var StaticData = {};
StaticData.pendingUpdates = 0;


StaticData.load =
    function () {
        this.loadDistrictList();
        console.log("Static Data load function call");
    };


StaticData.isLoadComplete =
    function () {
        if (this.pendingUpdates == 0) {
            return true;
        }
        return false;
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
    function (distance,myLat,myLong) {
        StaticData.centerData.allCenters = [];
        $.getJSON("34.651.json", function(json) {
            var district = {};
            district.districtID = 651;
            district.centers = json.centers;
            StaticData.centerData.allCenters.push(district);
            console.log(json);
            Interface.repaint();
        });

        $.getJSON("200.json", function(json) {
            var district = {};
            district.districtID = 200;
            district.centers = json.centers;
            StaticData.centerData.allCenters.push(district);
            console.log(json);
            Interface.repaint();
        });

        $.getJSON("20.json", function(json) {
            var district = {};
            district.districtID = 20;
            district.centers = json.centers;
            StaticData.centerData.allCenters.push(district);
            console.log(json);
            Interface.repaint();
        });
        
    };



 

