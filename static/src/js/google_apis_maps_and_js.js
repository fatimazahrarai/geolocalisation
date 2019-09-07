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
    var link = 'https://www.google.com/maps/embed/v1/place?key='+key+'&amp;q='+location_as_URI;
    //retrun the url to the iframe
    document.getElementById('iframe_google_map').src=link;
}
function run_initialization_for_google_map_multip_location_js_api() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['London Eye, London', 51.503454,-0.119562],
        ['Palace of Westminster, London', 51.499633,-0.124755]
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>London Eye</h3>' +
        '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3>Palace of Westminster</h3>' +
        '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
        '</div>']
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });

}
