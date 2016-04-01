var app = angular.module("santu",["firebase","ngRoute"]);
app.config(['$routeProvider',function($routeprovider){
    $routeprovider.
    when('/',{
      templateUrl:'home.html',
      controller:'mainCtrl'  
    }).when('/about',{
	templateUrl:'about.html',
     controller:'mainCtrl'
})
.when('/contact',{
	templateUrl:'contact.html',
     controller:'mainCtrl'
})
.when('/profile',{
	templateUrl:'profile.html',
     controller:'mainCtrl'
    
}).
  otherwise({redirectTo :  '/'
	 });
}]);
app.factory("Auth",function($firebaseAuth){
   var ref = new Firebase("https://cooltesting.firebaseio.com/");
   return $firebaseAuth(ref); 
});
app.controller("mainCtrl",function(Auth,$scope,$firebaseArray,$firebaseObject){
    Auth.$onAuth(function(authData){
        console.log(authData);
       $scope.authData = authData; 
       
        var uid = authData.uid;
    $scope.ref = new Firebase("https://cooltesting.firebaseio.com/users"+uid);
        $scope.data = $firebaseArray($scope.ref);

        $scope.submit = function() {
        var json = {'name': $scope.name, 'age': $scope.age};
        $scope.ref.push(json);
        $scope.name = "";
        $scope.age = "";
        };
            $scope.reset = function(){
              $scope.name="";
              $scope.age="";  
            };
        $scope.del = function(id,name) {
            var suc = confirm("Are you sure?, you want to delete " + name +" ?");
            if (suc === true){
        var obj = $firebaseObject($scope.ref);
        obj.$loaded().then(function () {
            delete obj[id];
            obj.$save();
    
          })
            }
        };
    });
    
    $scope.login = function()
    {
    Auth.$authWithOAuthPopup("google").catch(function(error){
        Console.log(error);
    });
    
    
      
    }
    $scope.logout = function(){
        Auth.$unauth();
    }
      
});