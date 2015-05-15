var dveri = angular.module('dveri', ['ngRoute']);

dveri.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({enabled: true,requireBase: false});
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

  $scope.showDefaultDoorPopup = false;
  $scope.showPaintDoorPopup = false;
  $scope.showLeadPopup = false;
  $scope.showPolitics = false;
  $scope.showInOneClick = false;
  $scope.showThanks = false;

  $scope.doors = [
    {
      title: "Tornado",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      consruction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: 0px 0px"
    },
    {
      title: "Bumerang",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      consruction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: -172px 0px"
    },
    {
      title: "Kaskad",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      consruction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: -344px 0px"
    },
    {
      title: "Tornado",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      consruction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: 0px 0px"
    },
    {
      title: "Bumerang",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      consruction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: -172px 0px"
    },
    {
      title: "Kaskad",
      manufacturer: "Синержи",
      config: "Остекленные",
      filling: "Массив",
      consruction: "Сборная, царги из массива хвойных пород",
      opening: "Универсальное",
      set: "Коробка, комплект наличников",
      sizes: "Ширина 600, 700, 800, 900 мм; Высота 2000 мм",
      cover_image_position: "background-position: -344px 0px"
    }
  ]


  $scope.map = { center: { latitude: 56.8212112, longitude: 60.6353681 }, zoom: 13, options: { scrollwheel: false } };

  $scope.checkEmail = function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  $scope.changeType = function(type){
    $scope.selectedType = type;
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

  $scope.changeColor = function(color){
    if (color.pic_url!='') 
      $scope.selectedDoor.selected_cover_img = color.pic_url;
  }

  $scope.openPolitics = function(){
    $scope.showPolitics = true;
  }

  $scope.openInOneClick = function(){
    $scope.showInOneClick = true;
  }

  $scope.closeAllPopups = function(){
    $scope.showDefaultDoorPopup = false;
    $scope.showPaintDoorPopup = false;
    $scope.showLeadPopup = false;
    $scope.showPolitics = false;
    $scope.showInOneClick = false;
    $scope.showThanks = false;
  }

  $scope.makeMontPrice = function(door){
    if (door.price_set){
    num = door.price_set.replace(/\s+/g, '');
      num = parseInt(num) + 2300;
    }else{
      num = 0;
    }
    num = num.toString();
    num = num.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    return num;
  }

  $scope.sendData = function(object, comment, id){
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
    if (params['email']!=undefined && params['email'].trim() != ""){
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
      console.log(msg);
      $scope.names = {};
      $scope.phones = {};
      $scope.emails = {};
    });
    $scope.closeAllPopups();
    $scope.showThanks = true;
  }

  //
  // NEW CODE
  //

  $scope.plus = new Array(7);

  $scope.tooglePlus = function(number) {
    if ($scope.plus[number]) {
      $scope.plus[number] = false;
    }else{
      $scope.plus = new Array(7);
      $scope.plus[number] = true;
    }
  }

  $scope.closeAllPluses = function(){
    $scope.plus = new Array(7);
  }

  $scope.setSelectedDoor = function(index) {
    console.log(index);
    if ($scope.selectedDoorIndex == index) {
      $scope.selectedDoorIndex = undefined;
    }else{
      $scope.selectedDoorIndex = index;
    }
  }

});