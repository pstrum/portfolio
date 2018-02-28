var env = require('../../../config/environment');

(function() {

  var lat = $("#map").data("lat");
  var lng = $("#map").data("lng");

  window.initMap = function() {
    var mapOptions = {
      zoom: 15,
      center: {lat: parseFloat(lat), lng: parseFloat(lng)},
      disableDefaultUI: true,
      draggable: false,
      scrollwheel: false
    };

    if (lat === 'markerMap') {
      var bounds = new google.maps.LatLngBounds();
      var $entryList = $("#map-entry-list li:not(.replace-me)");
      var bounds = new google.maps.LatLngBounds();
      var locations = [];
      $entryList.each(function getLocations() {
        var entryLat = $(this).data("entry-lat");
        var entryLng = $(this).data("entry-lng");
        var xCallbackUrl = $(this).data("entry");
        var date = $(this).data("date");
        var keyword = $(this).data("keyword");
        locations.push({
          location: {
            lat: entryLat,
            lng: entryLng
          },
          entryUrl: xCallbackUrl,
          entryType: keyword,
          entryDate: date
        });
      });

      mapOptions = {
        zoom: 3,
        center: {lat: 38.431728, lng: -95.797011},
        disableDefaultUI: true,
        gestureHandling: 'cooperative'
      };

      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var markers = locations.map(function(location) {
        var iconUrl = '/icons/location.svg';
        switch (location.entryType) {
          case 'favorite':
            iconUrl = '/icons/location-favs.svg';
            break;
          case 'travel':
            iconUrl = '/icons/location-travel.svg';
            break;
          case 'music':
            iconUrl = '/icons/location-music.svg';
            break;
        }
        var entry = '<a href="' + location.entryUrl + '">' + location.entryDate + '</a>';
        var infoWindow = new google.maps.InfoWindow({
          content: entry
        });
        var marker = new google.maps.Marker({
          position: location.location,
          icon: iconUrl
        });
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
        return marker;
      });
      var markerCluster = new MarkerClusterer(map, markers, {
        styles: [{
          textColor: 'white',
          width: '53',
          height: '52',
          url: '/images/m1.png'
        }]
      });
      var styles = markerCluster.getStyles();
    } else {
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var geocoder = new google.maps.Geocoder;
      geocodeLatLng(geocoder, map);
      google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
      });
    }
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
          map.setZoom(14);
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
