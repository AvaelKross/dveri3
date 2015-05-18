var dveri = angular.module('dveri', ['ngRoute', 'duScroll']).value('duScrollGreedy', true);

dveri.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({enabled: true, requireBase: false});
});

dveri.directive("scroll", function ($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
      if (this.pageYOffset >= 777) {
        scope.fixedMenu = true;
      } else {
        scope.fixedMenu = false;
      }
      scope.$apply();
    });
  };
});

dveri.directive("fadein", function($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
      if (this.pageYOffset >= 1250) {
        setTimeout(function () {
          $(element).fadeIn(700);
        }, parseInt(attrs["fadein"]));
      }
      scope.$apply();
    });
  };
})

dveri.directive('inputMask', ['$document', function($document) {
  return {
    link: function(scope, elm, attrs) {
      var phonemask = "+7 (999) 999-99-99";
      elm.mask(phonemask);
    }
  };
}]);

dveri.controller('MainCtrl', function ($scope, $sce, $location, $http) {
  $scope.names = {};
  $scope.phones = {};
  $scope.emails = {};

  $scope.showLeadPopup = false;
  $scope.showPolitics = false;
  $scope.showThanks = false;

  $scope.doors = [
    {
      title: "Локо 209",
      manufacturer: "Свобода",
      config: "",
      filling: "Массив",
      cover: "Шпон",
      construction: "Каркасно-щитовая, с сотовым заполнением",
      furn: "Установлена",
      opening: "Универсальное",
      set: "Коробка, комплект наличников, петли, замок",
      sizes: "Ширина 600, 700, 800 мм; Высота 2000 мм",
      cover_image: "1/Loko_209_venge_laysvud.jpg",
      colors: [
        {key: "white_yas", image: "1/Loko_209_beliy_yasen.jpg"},
        {key: "venge_laiswood", image: "1/Loko_209_venge_laysvud.jpg"},
        {key: "graywood", image: "1/Loko_209_greywood.jpg"},
        {key: "makassar", image: "1/loko_209_makassar.jpg"}
      ]
    },
    {
      title: "Краснодеревщик 73.02",
      manufacturer: "Краснодеревщик",
      config: "Остекленные",
      filling: "Сотовое",
      cover: "Шпон",
      construction: "Каркасно-щитовая, с заполнением трубчатым ДСП",
      furn: "Установлена",
      opening: "Универсальное",
      set: "Коробка, комплект наличников, петли, замок",
      sizes: "Ширина 620, 720, 820, 920 мм; Высота 2010 мм",
      cover_image: "2/krasnoderevshik_73_02_moreniy_dub.jpg",
      colors: [
        {key: "dub_coffee", image: "2/krasnoderevshik_73_02_dub_kofe.jpg"},
        {key: "brazil_grusha", image: "2/Krasnoderevshik_73.02_brazilskaya_grusha.jpg"},
        {key: "dub_milk", image: "2/krasnoderevshik_73_02_dub_molochniy.jpg"},
        {key: "mor_dub", image: "2/krasnoderevshik_73_02_moreniy_dub.jpg"}
      ]
    },
    {
      title: "Краснодеревщик 33.40ф",
      manufacturer: "Краснодеревщик",
      config: "Остекленные",
      filling: "Массив",
      cover: "CPL",
      construction: "Сборная, царги из массива хвойных пород",
      furn: "Установлена",
      opening: "Универсальное",
      set: "Коробка, комплект наличников, петли, замок",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image: "3/krasnoderevshik_33_40f_beliy_chetnoe_steklo.jpg",
      colors: [
        {key: "white", image: "3/krasnoderevshik_33_40f_beliy_chetnoe_steklo.jpg"}
      ]
    },
    {
      title: "Локо 207",
      manufacturer: "Свобода",
      config: "",
      filling: "Массив",
      cover: "Шпон",
      construction: "Каркасно-щитовая, с сотовым заполнением",
      furn: "Установлена",
      opening: "Универсальное",
      set: "Коробка, комплект наличников, петли, замок",
      sizes: "Ширина 600, 700, 800 мм; Высота 2000 мм",
      cover_image: "4/loko_207_venge_layswood.jpg",
      colors: [
        {key: "white_yas", image: "4/loko_207_beliy_yasen.jpg"},
        {key: "venge_laiswood", image: "4/loko_207_venge_layswood.jpg"},
        {key: "graywood", image: "4/loko_207_greywood.jpg"},
        {key: "makassar", image: "4/loko_207_makassar.jpg"}
      ]
    },
    {
      title: "Локо 204",
      manufacturer: "Свобода",
      config: "",
      filling: "Массив",
      cover: "Шпон",
      construction: "Каркасно-щитовая, с сотовым заполнением",
      furn: "Установлена",
      opening: "Универсальное",
      set: "Коробка, комплект наличников, петли, замок",
      sizes: "Ширина 600, 700, 800 мм; Высота 2000 мм",
      cover_image: "5/Loko_204_greywood.jpg",
      colors: [
        {key: "white_yas", image: "5/Loko_204_beliy_yasen.jpg"},
        {key: "venge_laiswood", image: "5/Loko_204_venge_layswood.jpg"},
        {key: "graywood", image: "5/Loko_204_greywood.jpg"},
        {key: "makassar", image: "5/Loko_204_makassar.jpg"}
      ]
    },
    {
      title: "Краснодеревщик 50.33",
      manufacturer: "Краснодеревщик",
      config: "Остекленные",
      filling: "Сотовое",
      cover: "CPL",
      construction: "Каркасно-сотовая с фальцем (притвором) ",
      furn: "Установлена",
      opening: "Универсальное",
      set: "Коробка, комплект наличников, петли, замок",
      sizes: "Ширина 620, 720, 820, 920 мм; Высота 2010 мм",
      cover_image: "6/krasnoderevshik 50.33_beliy_steklo_matovoe.jpg",
      colors: [
        {key: "white", image: "6/krasnoderevshik 50.33_beliy_steklo_matovoe.jpg"}
      ]
    }
  ]

  $scope.colors = {
    white_yas: {
      name: "Белый ясень",
      image: "white_yasen.jpg"
    },
    white: {
      name: "Белый",
      image: "white.jpg"
    },
    brazil_grusha: {
      name: "Бразильская груша",
      image: "brazil_grusha.jpg"
    },
    venge_laiswood: {
      name: "Венге Лайсвуд",
      image: "venge_laiswood.jpg"
    },
    venge: {
      name: "Венге",
      image: "venge.jpg"
    },
    graywood: {
      name: "Грейвуд",
      image: "graywood.jpg"
    },
    dub_coffee: {
      name: "Дуб кофе",
      image: "dub_coffee.jpg"
    },
    dub_milk: {
      name: "Дуб молочный",
      image: "dub_milk.jpg"
    },
    makassar: {
      name: "Макассар",
      image: "makassar.jpg"
    },
    mor_dub: {
      name: "Дуб морёный",
      image: "mor_dub.jpg"
    }
  }

  $scope.checkEmail = function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  $scope.showHtml = function(html){
    return $sce.trustAsHtml(html);
  }

  $scope.openLeadPopup = function(where, text, button_text){
    if (text==undefined) {text = "Мы перезвоним Вам<br>в ближайшее время"};
    if (button_text==undefined) {button_text="Заказать звонок"};
    $scope.leadPopupText = text;
    $scope.leadPopupButtonText = button_text;
    $scope.currentWhere = where;
    $scope.showLeadPopup = true;
  }

  $scope.openPolitics = function(){
    $scope.showPolitics = true;
  }

  $scope.closeAllPopups = function(){
    $scope.showDefaultDoorPopup = false;
    $scope.showPaintDoorPopup = false;
    $scope.showLeadPopup = false;
    $scope.showPolitics = false;
    $scope.showInOneClick = false;
    $scope.showThanks = false;
  }

  $scope.sendData = function(object, comment, id, noemail){
    params = {}
    params['comment'] = comment;
    add_params = $location.search();
    params['name'] = $scope.names[id];
    params['email'] = $scope.emails[id];
    params['phone'] = $scope.phones[id];
    if (params['name']==undefined || params['name'].trim() == "") {
      alert('Вы не ввели имя!');
      return;
    }
    if (params['phone']==undefined || params['phone'].trim() == "") {
      alert('Вы не ввели телефон!');
      return;
    }
    if (!noemail){
      if (!$scope.checkEmail(params['email'])) {
        alert('Email введен некорректно!');
        return;
      }
    }
    params['utm_content'] = add_params['utm_content'];
    params['utm_campaign'] = add_params['utm_campaign'];
    params['utm_source'] = add_params['utm_source'];
    params['utm_term'] = add_params['utm_term'];
    params['utm_medium'] = add_params['utm_medium'];
    $http.post("ajax-proxy", params)
    .then(function( msg ) {
    });
    $scope.names = {};
    $scope.phones = {};
    $scope.emails = {};
    $scope.closeAllPopups();
    $scope.showThanks = true;
  }

  //
  // NEW CODE
  //

  $scope.currentPlus = undefined;

  $scope.togglePlus = function(number) {
    if ($scope.currentPlus != undefined) {
      $scope.currentPlus = undefined;
    }else{
      $scope.currentPlus = number;
    }
  }

  $scope.setSelectedDoor = function(index) {
    if ($scope.selectedDoorIndex == index) {
      $scope.selectedDoorIndex = undefined;
    }else{
      $scope.selectedDoorIndex = index;
    }
  }

  $scope.changeColor = function(image_url, index) {
    $scope.doors[index].cover_image = image_url;
  }

});