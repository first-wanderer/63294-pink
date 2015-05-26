//добавление интерактивной карты
function initialize() {  
  var centerLatlng = new google.maps.LatLng(45.043712, 38.943004);
  var mapOptions = {
    zoom: 18,
    center: centerLatlng
  }
  var map = new google.maps.Map(document.getElementById("google-map"), mapOptions);
  
  var image = 'img/map-marker.svg';
  var myLatlng = new google.maps.LatLng(45.043407, 38.944861);
  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,      
      icon: image
  });
}

google.maps.event.addDomListener(window, "load", initialize);


