var Interface = {};
Interface.template =
    `<table id = "tbl-header">
          <thead style = "background-color: #f5b4f5c4;position: -webkit-sticky;position: sticky;top: 0;">
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Address</th>
              <th>Availability</th>
              <th>Age</th>
              <th>Fee Type</th>
              <th>Vaccine</th>
            </tr>
          </thead>
            <tbody id="geeks">
            {{#finalOutput}}
                <tr>
                    <td style = "width: 12% ">{{ date }}</td>
                    <td>{{ name }}</td>
                    <td>{{ address }}</td>
                    <td>{{ available_capacity }}</td>
                    <td>{{ min_age_limit }}</td>
                    <td>{{ fee_type }}</td>
                    <td>{{ vaccine }}</td>
                </tr>
            {{/finalOutput}}  
            </tbody>
        </table>`;

Interface.buttonCSS = function (condition) {
    if (condition.min_age_limit == 18) {
        $("#age18").css("background-color", "purple");
        $("#age45").css("background-color", "#ee8bee");
        $("#all").css("background-color", "#ee8bee");
    }
    else if (condition.min_age_limit == 45) {
        $("#age18").css("background-color", "#ee8bee");
        $("#age45").css("background-color", "purple");
        $("#all").css("background-color", "#ee8bee");
    }
    else if (condition.vaccine == 'COVISHIELD') {
        $("#vaccineSH").css("background-color", "purple");
        $("#vaccineXI").css("background-color", "#ee8bee");
        $("#vaccineSP").css("background-color", "#ee8bee");
        $("#all").css("background-color", "#ee8bee");
    }
    else if (condition.vaccine == 'COVAXIN') {
        $("#vaccineSH").css("background-color", "#ee8bee");
        $("#vaccineXI").css("background-color", "purple");
        $("#vaccineSP").css("background-color", "#ee8bee");
        $("#all").css("background-color", "#ee8bee");
    }
    else if (condition.vaccine == 'SPUTNIK') {
        $("#vaccineSH").css("background-color", "#ee8bee");
        $("#vaccineXI").css("background-color", "#ee8bee");
        $("#vaccineSP").css("background-color", "purple");
        $("#all").css("background-color", "#ee8bee");
    }
}

Interface.filter_condition = {};
Interface.setFilter = function (condition) {
    if (condition == undefined) {
        Interface.repaint();
        return;
    }
    if (condition.min_age_limit !== undefined) {
        Interface.filter_condition.min_age_limit = condition.min_age_limit;
    }
    if (condition.vaccine !== undefined) {
        Interface.filter_condition.vaccine = condition.vaccine;
    }
    Interface.buttonCSS(condition);
    Interface.paintFiltered(Interface.filter_condition);
}

Interface.filtereddata = {};
Interface.paintFiltered =
    function (filtercondition) {

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
                Interface.filtereddata.finalOutput.push(session);
        }
        var text = Mustache.render(Interface.template, Interface.filtereddata);
        $("#viewCenters").html(text);
    };

Interface.repaint =
    function () {
        // Interface.filter_condition = {};
        $("#vaccineSH").css("background-color", "#ee8bee");
        $("#vaccineXI").css("background-color", "#ee8bee");
        $("#vaccineSP").css("background-color", "#ee8bee");
        $("#age18").css("background-color", "#ee8bee");
        $("#age45").css("background-color", "#ee8bee");
        $("#all").css("background-color", "purple");
        var text = Mustache.render(Interface.template, StaticData);
        $("#viewCenters").html(text);
        console.log("Repaint");
    };

