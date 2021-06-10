var Interface = {};

Interface.repaint =
    function () {
        // filteredDataSet
        var template =
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
        var text = Mustache.render(template, StaticData);
        $("#viewCenters").html(text);
        console.log("Repaint");
    };

