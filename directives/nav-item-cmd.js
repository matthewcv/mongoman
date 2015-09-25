(function () {
"use strict";
    
    class NavItemCommandController{
       constructor(scope){
           this.scope = scope;
           this.commands = null;
           this.defaultCommand = null;
           
           if(this.scope.navItemCmd.getCommands && angular.isFunction(this.scope.navItemCmd.getCommands)){
               var cmds = this.scope.navItemCmd.getCommands();
               if(angular.isArray(cmds)){
                   this.commands = cmds;
                   var defCmd = cmds.filter((c) =>{
                       return c.isDefault;
                   })
                   if(defCmd && defCmd.length){
                       this.defaultCommand = defCmd[0];
                   }
               }
           }           
       }
       
       executeCommand(cmd){
           var res = cmd.action();
           if(res instanceof Promise){
               
               res.then((pr)=>{
                   console.dir(pr)
                   this.scope.$apply();
               })
           }
           else{
               this.scope.$apply();
           }

       }
    }
    
    
    
    angular.module('mongoman')
    .controller('navItemCommandController', ["$scope",function(scope){
        return new NavItemCommandController(scope);
    }])
    .directive('navItemCmd', [function(){
        return{
            controller:"navItemCommandController as nic",
            restrict: "A",
            link: function(scope, element, attributes, controller){
                if(controller.defaultCommand){
                    element.on('dblclick', function(e){
                        e.stopPropagation();
                        e.preventDefault();
                        controller.executeCommand(controller.defaultCommand);
                        return false;
                    })
                }

            },
            scope:{
                navItemCmd:'='
            }
        }
    }])

})()