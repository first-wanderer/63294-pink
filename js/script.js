(function() {
'use strict';

  //добавление интерактивной карты
  (function(){
    function initialize() {  
      var centerLatlng = new google.maps.LatLng(59.938910, 30.323031);
      var mapOptions = {
        zoom: 17,
        center: centerLatlng
      };
      var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
      
      var image = 'img/map-marker.svg';
      var myLatlng = new google.maps.LatLng(59.938641, 30.323010);
      new google.maps.Marker({
          position: myLatlng,
          map: map,      
          icon: image
      });
    }

    if(document.querySelector('#google-map')) {
      google.maps.event.addDomListener(window, 'load', initialize);
    }  
  })();

  //Изменение значений числовых полей
  (function(){
    var elements = document.querySelectorAll('.input-range');

    function initRange(parent) {
      var input = parent.querySelector('input');
      var minus = parent.querySelector('.range-minus');
      var plus = parent.querySelector('.range-plus');

      minus.addEventListener('click', function() {
        changeRange(false);
      });
      plus.addEventListener('click', function() {
        changeRange(true);
      });

      function changeRange(operation) {
        var value = Number(input.value);
        
        if (isNaN(value) || value < 1) {
          value = 1;
        }

        if (operation) {
          input.value = value + 1;
        } else {
          input.value = value - 1;
        }
      }
    }

    for (var i = 0; i < elements.length; i++) {
      initRange(elements[i]);
    }    
  })();

  //AJAX отправка формы
  (function(){
    if (!('FormData' in window)) {
      return;
    }

    var form = document.querySelector('#form-contest');

    function request(data, fn) {
      var xhr = new XMLHttpRequest();
      var time = (new Date()).getTime();

      xhr.open('post', 'http://simonenko.su/academy/echo?' + time);

      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState == 4) {
          fn(xhr.responseText);
        }
      });

      xhr.send(data);
    }
    
    if (form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        var data = new FormData(form);

        request(data, function(response) {
          console.log(response);
        });
      });
    }
  })();

}());