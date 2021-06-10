var Interface = {};
Interface.template =
    `<table cellpadding="0" cellspacing="0" border="0">
            {{#finalOutput}}
            <tbody id="geeks">
                <tr>
                    <td>{{ date }}</td>
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


Interface.setFilter = function(condition){
    console.log(condition);
    Interface.paintFiltered(condition); 
}




        
Interface.filtereddata = {};
Interface.paintFiltered =
    function (filtercondition) {
        // StaticData
        var keystocheck = ['min_age_limit', 'fee_type', 'vaccine', 'available_capacity'];
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
        // filteredDataSet
        var text = Mustache.render(Interface.template, StaticData);
        $("#viewCenters").html(text);
        console.log("Repaint");
    };

