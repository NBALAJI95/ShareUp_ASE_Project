angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

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
  .controller('LoginCtrl', function ($scope, $state,LoginService, $firebaseAuth,$ionicPopup,$cookieStore) {

    var fbAuth = $firebaseAuth();

    $scope.logi = function(username, password) {
      fbAuth.$signInWithEmailAndPassword(username, password).then(function (authData) {
        $state.go("home");
      }).catch(function (error) {
        console.error("ERROR: " + error);
      });
    };
  })

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


  .controller('HomeCtrl', function($scope, $stateParams) {
  })

  .controller('MainCtrl', function($scope, $state) {
    $scope.login1 = function() {
      $state.go('login');
    }

    $scope.register1 = function() {
      $state.go('register');
    }


  })


  .controller('RegCtrl', function($scope, $stateParams) {
  })



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };


});
