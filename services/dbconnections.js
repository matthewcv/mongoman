(function () {
  "use strict";
  var mongodb = require("mongodb");
  class ConnectionManager{
    constructor(){
      this.connections = [];
    }

    hasConnections(){
      return this.connections.length > 0;
    }

    connect(conInfo ){
      var con = new ServerConnection(conInfo);
      return con.connect().then(c => {
        this.connections.push(c);
        return c;
      }, err => {
        return err;
      });
    }
  }

  class ServerConnection{

    constructor(conInfo){
      this.serverAndPort = conInfo.serverAndPort;
      this.client = new mongodb.MongoClient();
      this.databases = null;
    }

    connect(){
      var conn;
      return this.client.connect("mongodb://"+ this.serverAndPort).then((db) =>{
        conn = db;
        var admin = conn.admin();
        return admin.listDatabases();
      },
      (err) =>{
        return err;
      }).then((dbs) => {
        this.databases = dbs.databases.map((d) => {
          return new Database(this, d.name);
        });
        conn.close();
        return this;
      },
      (err)=> {
        return err;
      });
    }
  }

  class Database{
    constructor(server,name){
      this.server = server;
      this.name = name;
      this.collections = null;
    }
    
    getCollections(){
      var theDb;
      return this.server.client.connect("mongodb://" + this.server.serverAndPort + "/" + this.name)
      .then((db) => {
        theDb = db;
        return db.collections();
      })
      .then((colls) =>{
        this.collections = colls.map((c) => {
          return new Collection(this,c.collectionName);
        })
        theDb.close();
        return this;
      })
    }
    
    getCommands(){
      var that = this;
      return [
        {
          name:"Show Collections",
          isDefault: true,
          action: ()=>{return that.getCollections()}
        }
      ]
    }
  }
  
  
  class Collection{
    constructor(database, name){
      this.database = database;
      this.name = name;
    }
  }

  angular.module("mongoman")
    .service("connectionManager", [function(){
      return new ConnectionManager();
    }])
})();
