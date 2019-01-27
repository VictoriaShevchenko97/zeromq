zmq = require('zeromq'),
pub=zmq.socket('pub'),
md5=require('md5'),
fs = require("fs");

let User=require('./lib/checkUser');
let obj = JSON.parse(fs.readFileSync('config.json', 'utf8'));

let str=`tcp://${obj.broker_host}:3000`;

let socket=pub.bindSync(str);

console.log('Publisher bound to '+str);

require('./lib/userConfig')(result=>{
  result=JSON.parse(result);
  let config={"type":result.type,"email":result.email,"pwd":md5(result.pwd),"msg_id":1};

    User.findUser(JSON.stringify(obj),config.email,config.pwd,(res)=>{
      if(res!='WRONG_PWD'){
        res={"msg_id":1,"user_id":JSON.parse(res)[0].user_id,"status":'ok'};
      }
      else{
        res={"msg_id":1,"error":res,"status":'error'};
      }
      socket.send(['app_in',JSON.stringify(res).toString()]);
    });

})
