cluster = require('cluster')
, zmq = require('zeromq'),
sub=zmq.socket('sub');
let fs=require('fs');
let argv = require('minimist')(process.argv.slice(2));

let str={
  "broker_host":argv.broker_host||'localhost',
  "db_host":argv.db_host||'localhost',
  "db_port" : argv.db_port||'5432',
  "db_name":argv.db_name||'zeromq',
  "db_user":argv.db_user||'postgres',
  "db_pwd":argv.db_host||'1111'
};

writeConfig(str);
let strConf=`tcp://${str.broker_host}:3000`;

let socket=sub.connect(strConf);
socket.subscribe('app_in');
console.log('Subscriber connected to '+strConf);

socket.on(`message`, (topic,msg)=>{
  console.log(`Client send ${msg}`);
});

function writeConfig(str) {
  let writeStream = fs.createWriteStream("config.json"); // создаем поток
  writeStream.write(JSON.stringify(str)); // пишем
  writeStream.end();
}
