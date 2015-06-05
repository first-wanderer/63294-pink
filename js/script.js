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


  //оживление слайдеров
  var tableSlider = document.querySelector('.slider-price');
  var reviewSlider = document.querySelector('.slider-reviews');
  
  (function(){
    if (!(tableSlider) && !(reviewSlider)) {
      return;
    }

    function resetActive (slidePoint) {
      for (var i = 0; i < slidePoint.length; i++) {
        slidePoint[i].classList.remove('is-slide-active');
      }
    }

    function initPos (i, slidePoint, slideObject, step) {
      slidePoint[i].addEventListener('click', function() {        
        slideObject.style.left = step*i + '%';
        resetActive (slidePoint);
        this.classList.add('is-slide-active');
      });
    }

    function moveControl(operation, slideObject, step, prev, next) {
      var valuePos = parseInt(slideObject.style.left, 10);
      
      prev.classList.remove('disabled');
      next.classList.remove('disabled');

      if (isNaN(valuePos)) {
        valuePos = 0;
      }

      if (operation) {
        valuePos = valuePos + step;
      } else {
        valuePos = valuePos - step;
      }

      if ( valuePos >= 0) {
        valuePos = 0;
        prev.classList.add('disabled');
      }
      if ( valuePos <= 3*step-step) {
        valuePos = 3*step-step;
        next.classList.add('disabled');
      }

      slideObject.style.left = valuePos + '%';
    }

    //слайдер таблицы 
    var slideTable = tableSlider.querySelector('.price-table');    
    var pointTable = tableSlider.querySelectorAll('.slider-pagination li');
    var stepTable = -85;    

    for (var i = 0; i < pointTable.length; i++) {
      initPos(i, pointTable, slideTable, stepTable);
    }

    //слайдер отзывов
    var slideReview = reviewSlider.querySelector('.slider-wrap');    
    var pointReview = reviewSlider.querySelectorAll('.slider-pagination li');
    var stepReview = -100;


    for (var i = 0; i < pointReview.length; i++) {
      initPos(i, pointReview, slideReview, stepReview);
    }

    var slidePrev = reviewSlider.querySelector('.prev-btn');
    var slideNext = reviewSlider.querySelector('.next-btn');    

    slidePrev.addEventListener('click', function() {
      moveControl(false, slideReview, stepReview, slidePrev, slideNext);
    });
    slideNext.addEventListener('click', function() {
      moveControl(true, slideReview, stepReview, slidePrev, slideNext);
    });

  }());
  



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

    //закрытие модальных окон
    var modalSuccess = document.querySelector('#reply-success');    
    var btnClose = document.querySelectorAll('.btn-close');

    for (var i = 0; i < btnClose.length; i++) {
      btnClose[i].addEventListener('click', function() {
        this.parentNode.classList.remove('modal-up-show');
      });
    }


    //пересчет даты возвращения
    var dateOut = form.querySelector('#date-out');
    var duration = form.querySelector('#duration');
    var dateIn = form.querySelector('#date-in');

    function calcDate() {
      dateIn.value = moment(dateOut.value).add(duration.value, 'days').format('YYYY-MM-DD');
    }
    
    dateOut.addEventListener('input', function() {
      calcDate();
    });
    duration.addEventListener('input', function() {
      calcDate();
    });

    
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

    compField.addEventListener('input', function() {
      compChange();
    });


    //Изменение значений числовых полей  
    var elements = form.querySelectorAll('.input-range');    

    function initRange(parent) {
      var input = parent.querySelector('input');
      var minus = parent.querySelector('.range-minus');
      var plus = parent.querySelector('.range-plus');

      function changeRange(operation) {
        var value = Number(input.value);        
        var idInpit = input.getAttribute('id');

        if (isNaN(value) || value < 1) {
          value = 1;
        }

        if (operation) {
          input.value = value + 1;
        } else {
          input.value = value - 1;
        }

        if (idInpit == 'duration') {
          calcDate();
        }
        if (idInpit == 'comp-field') {
          compChange();
        }
      }

      minus.addEventListener('click', function() {
        changeRange(false);
      });
      plus.addEventListener('click', function() {
        changeRange(true);
      });      
    }

    for (var i = 0; i < elements.length; i++) {
      initRange(elements[i]);
    }


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
          modalSuccess.classList.add('modal-up-show');
        });
      });    
    })(); 
  }());  

}());