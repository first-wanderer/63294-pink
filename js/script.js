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

    function initPag(slidePoint, slideObject, step){
      for (var i = 0; i < pointTable.length; i++) {
        initPos(i, slidePoint, slideObject, step);
      }
    }

    function resetActive(slidePoint) {
      // for (var i = 0; i < slidePoint.length; i++) {
      //   slidePoint[i].classList.remove('is-slide-active');
      // }
      [].forEach.call(slidePoint, function (el) {
        el.classList.remove('is-slide-active');
      });
    }

    function initPos(i, slidePoint, slideObject, step) {
      slidePoint[i].addEventListener('click', function() {        
        var posL = step*i;
        slideObject.style.transform = 'translate3d(' + posL + '%,0,0)';        
        resetActive (slidePoint);
        this.classList.add('is-slide-active');
      });
    }

    //слайдер таблицы 
    var slideTable = tableSlider.querySelector('.price-table');    
    var pointTable = tableSlider.querySelectorAll('.slider-pagination li');   
    var stepTable = -100/(pointTable.length)+2;      

    initPag(pointTable, slideTable, stepTable);

    window.addEventListener('resize', function() {      
      if (window.matchMedia('(min-width: 660px)').matches) {
        slideTable.style.transform = 'translate3d(0,0,0)';
        resetActive (pointTable);
        pointTable[0].classList.add('is-slide-active');
      }
    });

    //слайдер отзывов
    var slideReview = reviewSlider.querySelector('.slider-wrap');    
    var pointReview = reviewSlider.querySelectorAll('.slider-pagination li');   
    var stepReview = -100/(pointReview.length);

    initPag(pointReview, slideReview, stepReview);

    var slidePrev = reviewSlider.querySelector('.prev-btn');
    var slideNext = reviewSlider.querySelector('.next-btn');

    function moveControl(operation) {      
      var valuePos = slideReview.style.transform;

      valuePos = valuePos.substring(12, valuePos.length);      
      valuePos = parseFloat(valuePos);
      
      
      slidePrev.classList.remove('disabled');
      slideNext.classList.remove('disabled');

      if (isNaN(valuePos)) {
        valuePos = 0;
      }

      if (operation) {
        valuePos = valuePos + stepReview;
        valuePos = Math.floor(valuePos * 1e5)/1e5;
      } else {
        valuePos = valuePos - stepReview;
        valuePos = Math.ceil(valuePos * 1e5)/1e5;
      }

      if ( valuePos >= 0) {
        valuePos = 0;
        slidePrev.classList.add('disabled');
      }
      if ( valuePos <= -100-stepReview) {
        valuePos = -100-stepReview;
        slideNext.classList.add('disabled');
      }
      
      slideReview.style.transform = 'translate3d(' + valuePos + '%,0,0)';
    }

    slidePrev.addEventListener('click', function() {
      moveControl(false);
    });
    slideNext.addEventListener('click', function() {
      moveControl(true);
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

    [].forEach.call(btnClose, function (el) {
      el.addEventListener('click', function() {
        this.parentNode.classList.remove('modal-up-show');
      });
    });

    //пересчет даты возвращения
    var dateOut = form.querySelector('#date-out');
    var duration = form.querySelector('#duration');
    var dateArray = [dateOut, duration];
    var dateIn = form.querySelector('#date-in');

    function calcDate() {
      dateIn.value = moment(dateOut.value).add(duration.value, 'days').format('YYYY-MM-DD');
    }

    dateArray.forEach(function(element) {
      element.addEventListener('input', function() {
        calcDate();
      });
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
    }

    function compRemove(item) {      
      item.parentNode.removeChild(item);
      compField.value = compField.value - 1;
    }

    compChange();

    compField.addEventListener('input', function() {
      compChange();
    });

    compArea.addEventListener('click', function(event) {
      var target = event.target;
      if (target.tagName == 'A') {
        event.preventDefault();
        target = target.parentNode.parentNode;
        compRemove(target);
      }      
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

        if (isNaN(value) || value < 0) {
          value = 0;
        }

        if (operation) {
          value = value + 1;
        } else {
          value = value - 1;
        }

        if (value < 0) {
          value = 0;
        }

        input.value = value;

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

    [].forEach.call(elements, function (el) {
      initRange(el);
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
          modalSuccess.classList.add('modal-up-show');
        });
      });    
    })(); 
  }());  

}());