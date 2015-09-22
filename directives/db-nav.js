

(function () {
  "use strict";

  class DbNavController{
    constructor(scope,dbconnections){
      this.dbconnections = dbconnections;
      this.scope = scope;
      this.isAddingConnection = !dbconnections.hasConnections();
      this.newConnection = {
        serverAndPort:"localhost:27017"
      }
    }

    connect(){
      this.dbconnections.connect(this.newConnection).then(db =>{
        console.dir(db)
        this.scope.$apply();

      },err =>{
        console.dir(err)
      })
      this.isAddingConnection = false;
    }

  }

  angular.module("mongoman")
    .controller("dbNavController",["$scope", "dbconnections",function(scope,dbc){
      return new DbNavController(scope,dbc);
    }])
  .directive("dbNav", function(){
    return {
      templateUrl:"directives/db-nav.html",
      controller: "dbNavController as dbNav",
      restrict:"E"
    }
  })

})();
