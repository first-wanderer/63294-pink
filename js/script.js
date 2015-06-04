(function() {
'use strict';

  //Переключение видимости навигационного меню  
  var toggleMenu = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.page-nav');

  toggleMenu.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    navMenu.classList.toggle('nav-menu-show');
  });

  document.addEventListener('click', function() {
    if (navMenu.classList.contains('nav-menu-show')) {
      navMenu.classList.remove('nav-menu-show');        
    }      
  });

  //добавление интерактивной карты  
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
  
  //работа с формой
  var form = document.querySelector('#form-contest');

  (function(){
    if (!(form)) {
      return;
    }

    //Изменение значений числовых полей  
    var elements = form.querySelectorAll('.input-range');

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

    
    //рендеринг компаньонов в форме
    var compField = form.querySelector('#comp-field');
    var compTemplate = document.querySelector('#comp-template').innerHTML;
    var compArea = form.querySelector('.comps-block');

    function compChange() { 
      var compValue = Number(compField.value);
      compArea.innerHTML = '';
      for (var i = 0; i < compValue; i++) {
        compGenerator(i+1);
      } 
    }

    function compGenerator(i) { 
      var html = Mustache.render(compTemplate, {
        'comp-i': i
      });

      var item = document.createElement('div');
      item.classList.add('comp', 'form-flex-sm');
      item.innerHTML = html;

      compArea.appendChild(item);

      item.querySelector('.comp-delete').addEventListener('click', function(event) {
        event.preventDefault();
        compRemove(item);
      });
    }

    function compRemove(item) {      
      item.parentNode.removeChild(item);
      compField.value = compField.value - 1;
    }

    compChange();

    compField.addEventListener('change', function() {
      compChange();
    });    


    //обработка фото и AJAX отправка формы
    (function(){
      if (!('FormData' in window) || !('FileReader' in window)) {
        return;
      }
    
      var area = form.querySelector('.fotos-block');
      var template = document.querySelector('#foto-template').innerHTML;
      var queue = [];

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

      function preview(file) { 
        if (file.type.match(/image.*/)) {
          var reader = new FileReader();

          reader.addEventListener('load', function(event) {
            var html = Mustache.render(template, {
              'image': event.target.result,
              'name': file.name
            });

            var item = document.createElement('div');
            item.classList.add('foto-item');
            item.innerHTML = html;

            area.appendChild(item);

            item.querySelector('.foto-delete').addEventListener('click', function(event) {
              event.preventDefault();
              removePreview(item);
            });

            queue.push({
              'file': file,
              'item': item
            });
          });

          reader.readAsDataURL(file);
        }
      }

      function removePreview(item) {
        queue = queue.filter(function(element) {
          return element.item != item;
        });
        
        item.parentNode.removeChild(item);
      }

      form.querySelector('#foto-upload').addEventListener('change', function() {
        var files = this.files;
        for (var i = 0; i < files.length; i++) {
          preview(files[i]);
        }
        this.value = '';
      });
      
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        var data = new FormData(form);

        queue.forEach(function(element) {
          data.append('images', element.file);
        });

        request(data, function(response) {
          console.log(response);
        });
      });    
    })(); 
  }());
  
}());