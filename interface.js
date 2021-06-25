var Interface = {};
Interface.template =
    `<table>
          <thead>
            <tr>
              <th id="dateHead">Date</th>
              <th id="addressHead">Address</th>
              <th>Age</th>
              <th>Availability</th>
              <th>Fee</th>
              <th>Vaccine</th>
            </tr>
          </thead>
            <tbody id="geeks">
            {{#finalOutput}}
                <tr>
                    <td id="dateBody">{{ date }}</td>
                    <td id="addressBody">{{ name }}<br>{{ address }}<br>{{ pincode }}<br>{{ distance }} Km </td>
                    <td>{{ min_age_limit }}</td>
                    <td>Dose 1: {{ available_capacity_dose1 }}<br>Dose 2: {{ available_capacity_dose2 }}</td>
                    <td>{{ fee_type }}</td>
                    <td>{{ vaccine }}</td>
                </tr>
            {{/finalOutput}}  
            </tbody>
        </table>`;

Interface.templateMobile =
    `<table>
              <thead>
                <tr>
                
                  <th>SLOTS</th>
                </tr>
              </thead>
                <tbody id="geeks">
                {{#finalOutput}}
                    <tr>
                        <td>Age: {{ min_age_limit }}+, {{ fee_type }}, [Dose 1: {{ available_capacity_dose1 }}/Dose 2: {{ available_capacity_dose2 }}] , {{ vaccine }},  Distance: {{ distance }} Km  <br> {{ name }}, {{ address }}, {{ pincode }}<br>{{ date }}</td>
                    </tr>
                {{/finalOutput}}  
                </tbody>
            </table>`;



Interface.filter_condition = {};
Interface.setFilter = function (condition) {
    console.log("Called: Interface.setFilter");

    if (condition == undefined) {
        $("#age").css("display","block");
        Interface.filter_condition = {}; //Check Later
        Interface.repaint();
        return;
    }

    if (condition.min_age_limit !== undefined) {
        Interface.filter_condition.min_age_limit = condition.min_age_limit;
    }

    if (condition.vaccine !== undefined) {
        Interface.filter_condition.vaccine = condition.vaccine;
    }

    Interface.paintFiltered(Interface.filter_condition);
}

Interface.filtereddata = {};
Interface.paintFiltered =
    function (filtercondition) {
        console.log("Called: Interface.paintFiltered");

        var keystocheck = ['min_age_limit', 'fee_type', 'vaccine'];
        var filtereddata = {};
        Interface.filtereddata.finalOutput = [];
        for (var i = 0; i < StaticData.finalOutput.length; i++) {
            var session = StaticData.finalOutput[i];
            var toselect = true;
            for (var keyid = 0; keyid < keystocheck.length; keyid++) {
                var key = keystocheck[keyid];
                if (filtercondition[key] !== undefined) {
                    if (filtercondition[key] != session[key])
                        toselect = false;
                }
            }
            if (toselect == true)
                Interface.InstertFilteredDataSorted(session);
        }
        var text = Mustache.render(Interface.template, Interface.filtereddata);
        $("#viewCenters").html(text);
        var textForMobile = Mustache.render(Interface.templateMobile, Interface.filtereddata);
        $("#viewCentersInMobile").html(textForMobile);
    };

function checkWhetherToPush(arr, val) {
    return arr.some(function (arrVal) {
        return val.sessionID === arrVal.sessionID;
    });
}

Interface.InstertFilteredDataSorted = function (session)  //On basis of distance
{
    if (!checkWhetherToPush(Interface.filtereddata.finalOutput, session)) {
        Interface.filtereddata.finalOutput.push(session);
        Interface.filtereddata.finalOutput.sort((firstItem, secondItem) => firstItem.distance - secondItem.distance);
    }
}

Interface.repaint =
    function () {
        Interface.filter_condition = {};
        console.log("Called: Interface.repaint");
        var text = Mustache.render(Interface.template, StaticData);
        $("#viewCenters").html(text);
        var textForMobile = Mustache.render(Interface.templateMobile, Interface.filtereddata); //check for error
        $("#viewCentersInMobile").html(textForMobile);
    };

