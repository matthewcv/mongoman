(function () {
  "use strict";

  class DbNavController{
    constructor(dbconnections){
      this.dbconnections = dbconnections;
      this.isAddingConnection = !dbconnections.hasConnections();
      this.newConnection = {
        serverAndPort:"ch-mongo01-d:30128"
      }
    }

    connect(){
      this.dbconnections.connect(this.newConnection).then(db =>{
        console.dir(db)
      },err =>{
        console.dir(err)
      })
      this.isAddingConnection = false;
    }

  }

  angular.module("mongoman")
    .controller("dbNavController",["dbconnections",function(dbc){
      return new DbNavController(dbc);
    }])
  .directive("dbNav", function(){
    return {
      templateUrl:"directives/db-nav.html",
      controller: "dbNavController as dbNav",
      restrict:"E"
    }
  })

})();
