(function(){
"use strict";

angular.module("mongoman", [])
  .run(["$rootScope", function(rootScope){
    rootScope.title = "howdy";
  }]);

})();
