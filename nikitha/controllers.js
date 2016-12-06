angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

  .controller('groceryCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

  .controller('exCtrl', function($scope, $http) {
    $scope.func=function () {
      $scope.data=0;
      $http.get('https://api.mongolab.com/api/1/databases/harry/collections//expense?apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4').success(function (data) {
        $scope.incomes = data;
        for (var i = 0; i < data.length; i++) {
          $scope.data = $scope.data + parseInt(data[i].amount);
        }
        document.getElementById('texp').innerHTML=$scope.data
        console.log($scope.data)
      })
      $scope.remove = function (chat) {
        //Chats.remove(chat);
      };

      $http.get('https://api.mongolab.com/api/1/databases/harry/collections//exp?apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4').success(function (data) {
        $scope.expenses = data;
        $scope.dataexp=0
        for (var i = 0; i < data.length; i++) {
          $scope.dataexp = $scope.dataexp + parseInt(data[i].amount);
        }
        document.getElementById('tinc').innerHTML=$scope.dataexp
        $scope.final1=0
        $scope.final1=$scope.data-$scope.dataexp;
        document.getElementById('tbal').innerHTML=$scope.final1
        console.log($scope.final1)
        console.log($scope.dataexp)
      })
      $scope.remove = function (chat) {
        //Chats.remove(chat);
      };

    }
  })
  .controller('AddeCtrl', function($scope) {

  })


  .controller('InviewCtrl', function($scope,$http) {
    // $scope.settings = {
    // enableFriends: true
//};
    $http.get('https://api.mongolab.com/api/1/databases/harry/collections//expense?apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4').
    success(function (data) {
      $scope.incomes = data;
      console.log(data)
    })
    $scope.remove = function(chat) {
      //Chats.remove(chat);
    };
    $scope.gohome=function () {

    }
  })

  .controller('ExpenseviewCtrl', function($scope,$http, $state) {
    // $scope.settings = {
    // enableFriends: true
//};
    $http.get('https://api.mongolab.com/api/1/databases/harry/collections//exp?apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4').
    success(function (data) {
      $scope.expenses = data;

    })
    $scope.remove = function(chat) {
      //Chats.remove(chat);
    };
  })

  .controller('ExpenseController', function ($scope, $state,$http,$ionicPopup) {
    $scope.Exadd = function (data)
    {

      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/harry/collections//exp?apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4',
        data: JSON.stringify({

          name:$scope.expense.name,
          amount:$scope.expense.amount,
          date:$scope.expense.date,

        }),
        contentType:"application/json"

      }).success(function(data){

        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'Expense Added Successfully.'
        });
        //window.location = "/www/index.html#/tab/add";
        $state.go('env');
      });

      //console.log(id);

    }


  })

  .controller('AddCtrl', function($scope) {
    // $scope.settings = {
    // enableFriends: true
//};
  })

  .controller('IncomeController', function ($scope,$http,$ionicPopup,$state) {
    $scope.Inadd = function (data) {

      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/harry/collections//expense?apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4',
        data: JSON.stringify({

          name:$scope.income.name,
          amount:$scope.income.amount,
          date:$scope.income.date,

        }),
        contentType:"application/json"

      }).success(function(data){

        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'Income Added Successfully.'
        });
        //window.location = "/www/index.html#/tab/add";
        $state.go('inv');
      });
    }

    //console.log(id);


  })



  .controller('homeCtrlr', function($scope, $stateParams, Chats) {
  })

  .controller('groupCtrlr', function($scope,$http) {
    $scope.data1={};
    $scope.gnamename=[];
    $scope.getusers=function () {
      var gname=$scope.data1.group;
      //console.log($scope.data1.group)
      var name1=$http.get("https://api.mongolab.com/api/1/databases/harry/collections/users?q={\"gname\":\""+gname+"\"}&apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4")
      name1.success(function(data){

        for(var i=0;i<data.length;i++) {
          console.log(data.length)
          $scope.gnamename[i] = {"name": data[i].username};
        }
        console.log($scope.gnamename)
      });
    }
  })

  .controller('loginCtrl', function($scope, LoginService, DeleteService, UpdateService, $ionicPopup, $state,$http) {
      $scope.data = {};
	  $scope.groupName=function (username) {
      //console.log($scope.data1.group)
      //var temp = window.localStorage.getItem("username");
	  var name2 = $http.get("https://api.mongolab.com/api/1/databases/harry/collections/users?q={\"username\":\""+$scope.data.username+"\"}&apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4");

	  name2.success(function(data){

		gname=data[0].gname;
		window.localStorage.setItem("groupname", gname);

      });
    }
      $scope.login = function(username) {
		window.localStorage.setItem("username", $scope.data.username);

        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
			$scope.groupName();
          $state.go('home');
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });
      }

    $scope.redirectToRegistration=function()
    {
      $state.go('register');
    };

      $scope.goToHome =function()
      {
        $state.go('register');
      }
    }
  )

  .controller('registrationCtrlr', function($scope, RegisterService, DeleteService, UpdateService, $ionicLoading,$ionicPopup, $state) {
      $scope.data = {};

      $scope.delete =function(username)
      {
        DeleteService.deleteUser($scope.data.username).success(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Deleted!',
            template: 'Your account is deleted succesfully!'
          });
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });
      }
      $scope.update =function(username)
      {
        UpdateService.updateUser($scope.data.username).success(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Updated!',
            template: 'Your account is updated succesfully!'
          });
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Update failed!',
            template: 'Please check your credentials!'
          });
        });
      }


      $scope.completeRegistration = function(){

        RegisterService.RegisterUser( $scope.data.username, $scope.data.password,$scope.data.cpassword, $scope.data.mobile,$scope.data.nick,$scope.data.gname).success(function(data) {

          $state.go('login');
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Registration failed!',
            template: 'Please check your credentials!'
          });
        });
      }
})

  .controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
