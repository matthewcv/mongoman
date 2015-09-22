(function () {
  "use strict";
  var mongodb = require("mongodb");
  class DbConnections{
    constructor(){
      this.connections = [];
    }

    hasConnections(){
      return this.connections.length > 0;
    }

    connect(conInfo ){
      var c = new DbConnection(conInfo);
      return c.connect().then(db => {
        return db;
      }, err => {
        return err;
      });
    }
  }

  class DbConnection{

    constructor(conInfo){
      this.serverAndPort = conInfo.serverAndPort;
      this.client = new mongodb.MongoClient();
    }

    connect(){
      return this.client.connect("mongodb://"+ this.serverAndPort);
    }
  }

  angular.module("mongoman")
    .service("dbconnections", [function(){
      return new DbConnections();
    }])
})();
