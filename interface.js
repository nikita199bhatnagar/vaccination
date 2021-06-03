var Interface = {};
Interface.setDistance =
    function () {
        var givenDistance = $("#Distance").children("option:selected").val();
        setTimeout(() => { console.log(StaticData.getSessionByDistrict(givenDistance,myLocation.lat,myLocation.long)); }, 2000);
        
        $("#btn").on('click', function() {

            var data = {"." : [ {"name" : "Jonathan"}, {"name" : "Yash"}]};
           
        });

        console.log("Interface called");
    }

Interface.repaint =
    function () {
        var template = 
        `<table cellpadding="0" cellspacing="0" border="0">
            {{#allCenters}}
                <tr>
                    <td>{{ name }}</td>
                    <td>{{ district_name }}</td>
                    <td>{{ state_name }}</td>
                    <td>Date</td>
                    <td>Available Doses</td>
                </tr>
            {{/allCenters}}  
            </tbody>
        </table>`;
        var text = Mustache.render(template, StaticData.centerData);        
        $("#viewCenters").html(text);
        console.log("Repaint");
    };