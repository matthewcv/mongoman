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
      var con = new DbConnection(conInfo);
      return con.connect().then(c => {
        this.connections.push(c);
        return c;
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
      return this.client.connect("mongodb://"+ this.serverAndPort).then((db) =>{
        this.db = db;
        return this;
      },
      (err) =>{
        return err;
      });
    }
  }

  angular.module("mongoman")
    .service("dbconnections", [function(){
      return new DbConnections();
    }])
})();
