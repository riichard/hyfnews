var app = angular.module('part', ['angular.filter', 'ngResource', 'ngRoute'])
app.controller('myCtrl', function (worldNews, worldNewsCategories) {
    var vm = this;
    worldNewsCategories.getNewsCategories().then(function (NewsCategoriesData) {
        vm.newscategories = NewsCategoriesData;
    });
    worldNews.getNews().then(function (NewsData) {
        vm.newsdata = NewsData;
    });

});

app.service('worldNews', function ($http) {
    this.getNews = function () {
        return $http.get('news.json')
  .then(function (response) {
      return response.data;
  });
    };
});
app.service('worldNewsCategories', function ($http) {
    this.getNewsCategories = function () {
        return $http.get('newscategories.json')
  .then(function (response) {
      return response.data;
  });
    };
});
app.filter('getNameById', function () {
    return function (input, cats) {
        var i = 0, len = cats.length;
        for (; i < len; i++) {
            if (cats[i].cat_id == input) {
                return cats[i].cat_name;
            }
        }
        return "General";
    }
});
app.filter('getLast', function () {
    return function (input) {
        for (var i = input.length; i > input[3]; i--) {
            return input[i];
        }
    }
});
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider

    // route for the home page
            .when('/', {
                templateUrl: 'pages/home.html',
                controller: 'mainController as vm'
            })
            .when('/full/:newsid', {
                templateUrl: 'pages/Full.html',
                controller: 'fullController as vm'
            })
            .when('/home', {
                templateUrl: 'pages/home.html',
                controller: 'mainController as vm'
            })
    // route for the about page
            .when('/world', {
                templateUrl: 'pages/World.html',
                controller: 'worldController as vm'
            })

            .when('/sport', {
                templateUrl: 'pages/Sport.html',
                controller: 'sportController as vm'
            })
    // route for the contact page
            .when('/health', {
                templateUrl: 'pages/Health.html',
                controller: 'healthController as vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    //$locationProvider.html5Mode(true);
} ]);

app.controller('mainController', function (worldNews) {
    var vm = this;
    worldNews.getNews().then(function (NewsData) {
        vm.message = NewsData;

    });
});

app.controller('worldController', function (worldNews) {
    var vm = this;
    worldNews.getNews().then(function (NewsData) {
        vm.message = NewsData;

    });
});

app.controller('healthController', function (worldNews) {
    var vm = this;
    worldNews.getNews().then(function (NewsData) {
        vm.message = NewsData;

    });
});

app.controller('sportController', function (worldNews) {
    var vm = this;
    worldNews.getNews().then(function (NewsData) {
        vm.message = NewsData;

    });
});
app.controller('fullController', function (worldNews, $routeParams) {
    var vm = this;
    worldNews.getNews().then(function (NewsData) {
        vm.message = NewsData + $routeParams.newsid;

    });
});