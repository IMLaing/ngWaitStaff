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

/* Example 
myApp.factory('myFactory', function () {
    var self = this;
    self.total = 0;
    self.calculateTotal = function () {
        self.total += 100;
    }
    return self;
})
Don't forget to add in , myFactory and
    vm.myFactory = myFactory;

*/

myApp.factory('calcFactory', function () {
    var self = this;
    //total earned
    self.tipTotal = 0;
    self.avgTipPerMeal = 0;
    self.mealCount = 0;
    //customer Charges
    self.subtotal = 0;
    self.tip = 0;
    self.total = 0;

    self.updateEarnings = function () {
        self.mealCount++;
    }
    return self;
})

myApp.controller('myCtrl', function ($scope, $rootScope, calcFactory) {
    var vm = this;
    vm.calcFactory = calcFactory;

    vm.sendMealDetail = function () {
        var basePrice = $scope.data.baseMealPrice;
        var taxPercent = $scope.data.taxRate * .01;
        var tipPercent = $scope.data.tipPercent * .01;
        var totalTax = $scope.data.baseMealPrice * taxPercent;
        var subTotal = parseFloat(basePrice) + parseFloat(totalTax);
        var tipTotal = subTotal * tipPercent;
        self.subtotal = subTotal;
        self.tip = tipTotal;
        self.total = subTotal + tipTotal;
    }

    vm.reset = function () {
        $scope.data.baseMealPrice = '';
        $scope.data.taxRate = '';
        $scope.data.tipPercent = '';
    }

    vm.submit = function () {
        if ($scope.mealDetailForm.$valid) {
            vm.calcFactory.updateEarnings();
            console.log('form is valid');
            vm.sendMealDetail();
            vm.reset();
        } else {
            console.log('form is not valid');
        }
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