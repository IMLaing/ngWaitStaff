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

myApp.controller('myCtrl', function ($scope) {
    var vm = this;
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
    vm.updateEarnings = function (tipTotal) {
        vm.earningsData.mealCount++;
        vm.earningsData.tipTotal += tipTotal;
        vm.earningsData.avgTipPerMeal = vm.earningsData.tipTotal / vm.earningsData.mealCount;
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
        vm.customerCharges.subtotal = subTotal;
        vm.customerCharges.tip = tipTotal;
        vm.customerCharges.total = subTotal + tipTotal;
        vm.updateEarnings(tipTotal);
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