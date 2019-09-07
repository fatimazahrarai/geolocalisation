function run_iframe_google_map_link(){
    //get location text from the s_position input.
    var location = "empty"
    if(document.querySelector('.target_for_run_iframe_google_map_link').firstChild)//check if it is and edit form(meaning s_position is inside a span)
        location = document.querySelector('.target_for_run_iframe_google_map_link').firstChild.data;
    else//else it is a display form(meaning s_position is inside an input)
        location = document.querySelector('.target_for_run_iframe_google_map_link').value;
    //encode it as URI.
    var location_as_URI = encodeURIComponent(location);
    //set google map api.
    var key = 'AIzaSyDefCNxiEfC59BdR1SatwiqgCLZXJ6e4J4';
    //merge all var to creat the link
    var link = 'https://www.google.com/maps/embed/v1/place?key='+key+'&q='+location_as_URI;
    //retrun the url to the iframe
    document.getElementById('iframe_google_map').src=link;
}

function get_google_apis_com(){
    jQuery(function($) {
       // Asynchronously Load the map API
       var script = document.createElement('script');
       script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyDefCNxiEfC59BdR1SatwiqgCLZXJ6e4J4&callback=run_initialization_for_google_map_multip_location_js_api";
       document.body.appendChild(script);
//        run_initialization_for_google_map_multip_location_js_api();
    });
}
function run_initialization_for_google_map_multip_location_js_api(){
    var ee = document.createElement('div');
    ee.setAttribute('id', 'target_elemet_for_aside');
    document.getElementsByClassName('o_main_content')[0].appendChild(ee);
    document.getElementsByClassName('o_main_content')[0].style.height = "740px";
    document.getElementById('target_elemet_for_aside').innerHTML='<aside class="o_chatter oe_chatter o_chatter_composer_active"><div class="o_mail_chatter_attachments"><div class="o_chatter_attachment"><div id="map_wrapper" class="o_chatter_attachment_form" style="height:400px;"><div id="map_canvas" class="mapping o_chatter_attachment_form" style="height:100%;width:100%;"></div></div></div></div></aside>';

    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
       mapTypeId: 'roadmap'
    };

   // Display a map on the page
   map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
   map.setTilt(45);

   // Multiple Markers
   var title_target = -1, positon_target = -1;
   for(var i = 1; i < document.getElementsByClassName('o_sale_order')[0].getElementsByTagName('th').length; i++)
       if(document.getElementsByClassName('o_sale_order')[0].getElementsByTagName('th')[i].firstChild.data == "Position geo")
           positon_target = i-1;
       else if(document.getElementsByClassName('o_sale_order')[0].getElementsByTagName('th')[i].firstChild.data == "Customer")
           title_target = i-1;
   var markers = [];
   function areEqual(a, b){
       return (a[0] == b[0] && a[1] == b[1] && a[2] == b[2])
   }
   function hasEqual(target){
        if(target)
           for(var i = 0; i < markers.length; i++)
               if(markers[i] && areEqual(markers[i], target))
                   return true;
       return false;
   }
   for(var i = 0; i < document.getElementsByClassName('o_data_row').length; i++){
       var element = document.getElementsByClassName('o_data_row')[i].getElementsByClassName('o_data_cell');
       if(positon_target != -1 && element[positon_target].firstChild.data != "empty" && element[positon_target].firstChild.data.split(',').length==2){
           var marker = new Array(element[title_target].firstChild.data, element[positon_target].firstChild.data.split(',')[0],element[positon_target].firstChild.data.split(',')[1]);
           if(!hasEqual(marker))
               markers.push(marker);
       }
   }

   console.log(positon_target);
   console.log(title_target);
   console.log(marker);
   console.log(markers);
//    var markers = [
//        ['London Eye, London', 51.503454,-0.119562],
//        ['Palace of Westminster, London', 51.499633,-0.124755]
//    ];

   // Info Window Content
//    var infoWindowContent = [
//        ['<div class="info_content">' +
//        '<h3>London Eye</h3>' +
//        '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
//        ['<div class="info_content">' +
//        '<h3>Palace of Westminster</h3>' +
//        '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
//        '</div>']
//    ];

   // Display multiple markers on a map
   var infoWindow = new google.maps.InfoWindow(), marker, i;

   // Loop through our array of markers & place each one on the map
   for( i = 0; i < markers.length; i++ ) {
        if(markers[i][0] && markers[i][1] && markers[i][2]){
           var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
           bounds.extend(position);
           marker = new google.maps.Marker({
               position: position,
               map: map,
               title: markers[i][0]
           });
        }

       // Allow each marker to have an info window
//        google.maps.event.addListener(marker, 'click', (function(marker, i) {
//            return function() {
//                infoWindow.setContent(infoWindowContent[i][0]);
//                infoWindow.open(map, marker);
//            }
//        })(marker, i));

       // Automatically center the map fitting all markers on the screen
       map.fitBounds(bounds);
   }

   // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
   var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
       this.setZoom(14);
       google.maps.event.removeListener(boundsListener);
   });
}
