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
      if (this.pageYOffset >= 1550) {
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
      title: "Tornado",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      cover: "ПВХ",
      construction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: 0px 0px",
      colors: [
        {image: "color.png", title: "Дуб шампань"},
        {image: "color.png", title: "Белый ясень"},
        {image: "color.png", title: "Грейвуд"},
        {image: "color.png", title: "Грецкий орех"},
        {image: "color.png", title: "Дуб канелла"},
        {image: "color.png", title: "Дуб шервуд"}
      ]
    },
    {
      title: "Bumerang",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      cover: "ПВХ",
      construction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: -172px 0px",
      colors: [
        {image: "color.png", title: "Дуб шампань"},
        {image: "color.png", title: "Белый ясень"},
        {image: "color.png", title: "Грейвуд"},
        {image: "color.png", title: "Грецкий орех"},
        {image: "color.png", title: "Дуб канелла"},
        {image: "color.png", title: "Дуб шервуд"}
      ]
    },
    {
      title: "Kaskad",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      cover: "ПВХ",
      construction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: -344px 0px",
      colors: [
        {image: "color.png", title: "Дуб шампань"},
        {image: "color.png", title: "Белый ясень"},
        {image: "color.png", title: "Грейвуд"},
        {image: "color.png", title: "Грецкий орех"},
        {image: "color.png", title: "Дуб канелла"},
        {image: "color.png", title: "Дуб шервуд"}
      ]
    },
    {
      title: "Tornado",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      cover: "ПВХ",
      construction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: 0px 0px",
      colors: [
        {image: "color.png", title: "Дуб шампань"},
        {image: "color.png", title: "Белый ясень"},
        {image: "color.png", title: "Грейвуд"},
        {image: "color.png", title: "Грецкий орех"},
        {image: "color.png", title: "Дуб канелла"},
        {image: "color.png", title: "Дуб шервуд"}
      ]
    },
    {
      title: "Bumerang",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      cover: "ПВХ",
      construction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: -172px 0px",
      colors: [
        {image: "color.png", title: "Дуб шампань"},
        {image: "color.png", title: "Белый ясень"},
        {image: "color.png", title: "Грейвуд"},
        {image: "color.png", title: "Грецкий орех"},
        {image: "color.png", title: "Дуб канелла"},
        {image: "color.png", title: "Дуб шервуд"}
      ]
    },
    {
      title: "Kaskad",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      cover: "ПВХ",
      construction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: -344px 0px",
      colors: [
        {image: "color.png", title: "Дуб шампань"},
        {image: "color.png", title: "Белый ясень"},
        {image: "color.png", title: "Грейвуд"},
        {image: "color.png", title: "Грецкий орех"},
        {image: "color.png", title: "Дуб канелла"},
        {image: "color.png", title: "Дуб шервуд"}
      ]
    }
  ]

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

  // What ? :D Why not just store num of toggled ?

  $scope.plus = new Array(7);

  $scope.togglePlus = function(number) {
    if ($scope.plus[number]) {
      $scope.plus[number] = false;
    }else{
      $scope.plus = new Array(7);
      $scope.plus[number] = true;
    }
  }

  $scope.closeAllPluses = function(){
    // Do nothing! Hooray! Party time! Weekend!
    //$scope.plus = new Array(7);
  }

  $scope.setSelectedDoor = function(index) {
    if ($scope.selectedDoorIndex == index) {
      $scope.selectedDoorIndex = undefined;
    }else{
      $scope.selectedDoorIndex = index;
    }
  }

});