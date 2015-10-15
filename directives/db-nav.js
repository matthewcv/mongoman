


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
  
  var currentLi = null; //this is the li item in the nav that the mouse is hovering over
  var actionBox = null; //this is the little box that shows up when you hover over currentLi
  function showActions(elem){
    
    if(elem instanceof HTMLLIElement){
      console.dir(elem);
      if(actionBox == null){
        actionBox = document.getElementById("itemActions")
      }
      actionBox.style.display = 'block';
      currentLi = elem;
      currentLi.appendChild(actionBox)
      var ul = elem.querySelector('ul');
      if(ul){
        
      }
    }
  }
  
  function hideActions(){
    if(actionBox){
      actionBox.style.display = 'none';
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
          
          showActions(ev.target);
          
        })        
        elem.on("mouseout", function(ev){
          hideActions();
          
        })
      }
    }
  })

})();
