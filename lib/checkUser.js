var pg = require('pg');
require('dotenv').config();

var User={
  findUser(obj,email,pwd,cb){
    obj=JSON.parse(obj);
    var conString = `postgres://${obj.db_user}:${obj.db_pwd}@${obj.db_host}:${obj.db_port}/${obj.db_name}`;
    var client = new pg.Client(conString);
    client.connect(err=>{
      if(err)throw err;
      client.query('SELECT * FROM public.user WHERE passwd=$1 AND email=$2',[pwd,email],(err,result)=>{
        if(err)throw err;
        if(result.rows!=""){cb(JSON.stringify(result.rows));}
        else{cb('WRONG_PWD');}
      });
    });
  }
}
module.exports=User;
