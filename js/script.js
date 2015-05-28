//добавление интерактивной карты
function initialize() {  
  var centerLatlng = new google.maps.LatLng(59.938910, 30.323031);
  var mapOptions = {
    zoom: 17,
    center: centerLatlng
  }
  var map = new google.maps.Map(document.getElementById("google-map"), mapOptions);
  
  var image = 'img/map-marker.svg';
  var myLatlng = new google.maps.LatLng(59.938641, 30.323010);
  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,      
      icon: image
  });
}

google.maps.event.addDomListener(window, "load", initialize);


