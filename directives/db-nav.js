


(function () {
  "use strict";

  class DbNavController{
    constructor(scope,connectionManager){
      this.connectionManager = connectionManager;
      this.scope = scope;
      this.isAddingConnection = !connectionManager.hasConnections();
      this.newConnection = {
        serverAndPort:"localhost:27017"
      }
    }

    connect(){
      this.connectionManager.connect(this.newConnection).then(db =>{
        console.dir(db)
        this.scope.$apply();

      },err =>{
        console.dir(err)
      })
      this.isAddingConnection = false;
    }

  }
  
  function showToggler(elem){
    if(elem instanceof HTMLLIElement){
      var ul = elem.querySelector('ul');
      if(ul){
        
      }
    }
  }

  angular.module("mongoman")
    .controller("dbNavController",["$scope", "connectionManager",function(scope,dbc){
      return new DbNavController(scope,dbc);
    }])
  .directive("dbNav", function(){
    return {
      templateUrl:"directives/db-nav.html",
      controller: "dbNavController as dbNav",
      restrict:"E",
      link:function(scope, elem, attrs, ctrl){
        elem.on("mouseover", function(ev){
          
          showToggler(ev.target);
          
        })        
        elem.on("mouseout", function(ev){
          
          
        })
      }
    }
  })

})();
