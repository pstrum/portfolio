var env = require('../../../config/environment');

(function() {

  var lat = $("#map").data("lat");
  var lng = $("#map").data("lng");

  window.initMap = function() {
    console.log("yolo");
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: parseFloat(lat), lng: parseFloat(lng)},
      disableDefaultUI: true,
      draggable: false,
      scrollwheel: false
    });
    var geocoder = new google.maps.Geocoder;
    geocodeLatLng(geocoder, map);
    google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center); 
    });
  };

  function loadGoogle() {
    var mapsScript = document.createElement('script');
    var apiKey = env.googleKey;
    mapsScript.src = '//maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=window.initMap';
    mapsScript.async = true;
    document.body.appendChild(mapsScript);
  }

  function geocodeLatLng(geocoder, map) {
    var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          map.setZoom(15);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: '/icons/location.svg'
          });
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  loadGoogle();

})();

