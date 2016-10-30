var myApp = angular.module('myApp', ['ngMessages', 'ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: "myCtrl",
        controllerAs: 'vm'
    }).when('/new-meal', {
        templateUrl: 'new-meal.html',
        controller: "myCtrl",
        controllerAs: 'vm'
    }).when('/my-earnings', {
        templateUrl: 'my-earnings.html',
        controller: "myCtrl",
        controllerAs: 'vm'
    }).otherwise('/error', {
        template: '<p>Error - Page Not Found</p>' // note this uses template NOT templateUrl as you can see from the whitelist if statement above the path will be set to /error if the city doesn't exist in the whitelist cityArr value
    });
}]);

myApp.run(function ($rootScope) {
    $rootScope.subtotal = 0;
    $rootScope.tip = 0;
    $rootScope.total = 0;
    $rootScope.mealCount = 0;
    $rootScope.tipTotal = 0;
    $rootScope.avgTipPerMeal = 0;
});

myApp.controller('myCtrl', function ($scope, $rootScope) {
    var vm = this;
    vm.earningsData = {
        tipTotal: 0,
        mealCount: 0,
        avgTipPerMeal: 0
    }
    vm.reset = function () {
        $scope.data.baseMealPrice = '';
        $scope.data.taxRate = '';
        $scope.data.tipPercent = '';
    }
    vm.submit = function () {
        if ($scope.mealDetailForm.$valid) {
            console.log('form is valid');
            vm.sendMealDetail();
            vm.reset();
        } else {
            console.log('form is not valid');
        }
    }
    vm.sendMealDetail = function () {
        var basePrice = $scope.data.baseMealPrice;
        var taxPercent = $scope.data.taxRate * .01;
        var tipPercent = $scope.data.tipPercent * .01;
        var totalTax = $scope.data.baseMealPrice * taxPercent;
        var subTotal = parseFloat(basePrice) + parseFloat(totalTax);
        var tipTotal = subTotal * tipPercent;
        $rootScope.subtotal = subTotal;
        $rootScope.tip = tipTotal;
        $rootScope.total = subTotal + tipTotal;
        vm.updateEarnings(tipTotal);
    }
    vm.updateEarnings = function (tipTotal) {
        $rootScope.mealCount++;
        $rootScope.tipTotal += tipTotal;
        $rootScope.avgTipPerMeal = $rootScope.tipTotal / $rootScope.mealCount;
    }

    vm.fullReset = function () {
        vm.reset();
        vm.customerCharges = {
            subtotal: 0,
            tip: 0,
            total: 0
        }
        vm.earningsData = {
            tipTotal: 0,
            mealCount: 0,
            avgTipPerMeal: 0
        }

    }

});