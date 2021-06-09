var Interface = {};
Interface.setDistance =
    function () {
        var givenDistance = $("#Distance").children("option:selected").val();
        setTimeout(() => { console.log(StaticData.getSessionByDistrict(givenDistance, myLocation.lat, myLocation.long)); }, 2000);

        $("#btn").on('click', function () {

            var data = { ".": [{ "name": "Jonathan" }, { "name": "Yash" }] };

        });

        console.log("Interface called");
    }

Interface.repaint =
    function () {
        var template =
            `<table cellpadding="0" cellspacing="0" border="0">
            {{#finalOutput}}
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
        var text = Mustache.render(template, StaticData);
        $("#viewCenters").html(text);
        console.log("Repaint");
    };

