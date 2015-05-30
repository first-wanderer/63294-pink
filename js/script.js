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

//AJAX отправка формы
(function(){
	if (!("FormData" in window)) {
		return;
	};

	var form = document.querySelector("#form-contest");
	
	form.addEventListener("submit", function(event) {
		event.preventDefault();

		var data = new FormData(form);

		request(data, function(response) {
			console.log(response);
		});
	});

	function request(data, fn) {
		var xhr = new XMLHttpRequest();
		var time = (new Date()).getTime();

		xhr.open("post", "http://simonenko.su/academy/echo?" + time);

		xhr.addEventListener("readystatechange", function() {
			if (xhr.readyState == 4) {
				fn(xhr.responseText);
			};
		});

		xhr.send(data);
	};

})();
