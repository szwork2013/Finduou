function initMap() {
  //console.log(maplng);
  //console.log(maplot);
  var myLatLng = {lat: maplot, lng:maplng}
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:maplot, lng: maplng},
    zoom: 15
  });
  //alert(1)
  var marker1 = new google.maps.Marker({
    position: myLatLng,
    map: map,
   title: 'Hello World!'
  });
    var infowindow1 = new google.maps.InfoWindow();
     infowindow1.setContent("<div><strong>"+ $('#address-input-write').val() +"</strong><br>");
    infowindow1.open(map, marker1);
  

  var input =(document.getElementById('address-input-write'));

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    //marker1 = null;
    infowindow1.close();
    infowindow.close();
   marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
  marker1.setMap(null);
  //alert(1)
   locate.address = place.formatted_address;
   locate.place_id = place.place_id;
   locate.lat = place.geometry.location.lat()
   locate.lng = place.geometry.location.lng()
   //console.log(locate)

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  
    }

    marker.setPosition(place.geometry.location);
    //console.log(place.geometry.location);
   marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });
  
}
