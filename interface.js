var Interface = {};
Interface.template =
    `<table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Address</th>
              <th>Age</th>
              <th>Availability</th>
              <th>Fee</th>
              <th>Vaccine</th>
            </tr>
          </thead>
            <tbody id="geeks">
            {{#finalOutput}}
                <tr>
                    <td id="date">{{ date }}</td>
                    <td id="address">{{ name }}<br>{{ address }}<br>{{ pincode }}<br>{{ distance }} Km </td>
                    <td>{{ min_age_limit }}</td>
                    <td>{{ available_capacity }}</td>
                    <td>{{ fee_type }}</td>
                    <td>{{ vaccine }}</td>
                </tr>
            {{/finalOutput}}  
            </tbody>
        </table>`;

Interface.buttonCSS = function (condition) {

    if (condition.min_age_limit == 18) {
        $("#age18").css("background-color", "#5f367e");
        $("#age45").css("background-color", "#bd77f2");
        $("#all").css("background-color", "#bd77f2");
    }
    else if (condition.min_age_limit == 45) {
        $("#age18").css("background-color", "#bd77f2");
        $("#age45").css("background-color", "#5f367e");
        $("#all").css("background-color", "#bd77f2");
    }
    else if (condition.vaccine == 'COVISHIELD') {
        $("#vaccineSH").css("background-color", "#5f367e");
        $("#vaccineXI").css("background-color", "#bd77f2");
        $("#vaccineSP").css("background-color", "#bd77f2");
        $("#all").css("background-color", "#bd77f2");
    }
    else if (condition.vaccine == 'COVAXIN') {
        $("#vaccineSH").css("background-color", "#bd77f2");
        $("#vaccineXI").css("background-color", "#5f367e");
        $("#vaccineSP").css("background-color", "#bd77f2");
        $("#all").css("background-color", "#bd77f2");
    }
    else if (condition.vaccine == 'SPUTNIK') {
        $("#vaccineSH").css("background-color", "#bd77f2");
        $("#vaccineXI").css("background-color", "#bd77f2");
        $("#vaccineSP").css("background-color", "#5f367e");
        $("#all").css("background-color", "#bd77f2");
    }
}

Interface.filter_condition = {};
Interface.setFilter = function (condition) {
    console.log("Called: Interface.setFilter");
    
    if (condition == undefined) {
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

    Interface.buttonCSS(condition);  //------------------------------------------------------------------------------------------------------------
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
    };

Interface.InstertFilteredDataSorted = function ( session )
{
    // iterate throgh finalOutput
    // if the session.distance < current elemnt
    // insrt here
    // if the list ends, append at the tail

    // 0 - 78
    // 1 - 89
    // 0 -37, 1-78, 2-89
    Interface.filtereddata.finalOutput.push(session);
}

Interface.repaint =
    function () {
        Interface.filter_condition = {};
        console.log("Called: Interface.repaint");
        $("#vaccineSH").css("background-color", "#bd77f2");
        $("#vaccineXI").css("background-color", "#bd77f2");
        $("#vaccineSP").css("background-color", "#bd77f2");
        $("#age18").css("background-color", "#bd77f2");
        $("#age45").css("background-color", "#bd77f2");
        $("#all").css("background-color", "#5f367e");
        var text = Mustache.render(Interface.template, StaticData);
        $("#viewCenters").html(text);
        // console.log("Repaint");
    };

