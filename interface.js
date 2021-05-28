
//    var template_input = {};
//     template_input.districts = all_districts;
//     var template = `<table border>
//     {{#districts}}
//     <tr>
//     <td>{{district_id}}</td>
//     <td>{{district_name}}</td>
//     </tr>
//     {{/districts}}
//     </table>
//     `;
//     var html = Mustache.to_html(template, template_input);
//     $("#interface').html(html);



var Interface = {};
Interface.setDistance = 
function (){
    var givenDistance = $("#Distance").children("option:selected").val();
    StaticData.getSessionByDistrict(givenDistance,myLocation.lat,myLocation.long);

    console. log("Hello");
    setTimeout(() => { console. log("World!"); }, 2000);
    
    console.log("Interface called");
};

Interface.repaint =
function (){
    console.log("Repaint");
};