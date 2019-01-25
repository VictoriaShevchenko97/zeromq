cluster = require('cluster')
, zmq = require('zeromq'),
sub=zmq.socket('sub');
var fs=require('fs');
var argv = require('minimist')(process.argv.slice(2));

var str={
  "broker_host":argv.broker_host||'localhost',
  "db_host":argv.db_host||'localhost',
  "db_port" : argv.db_port||'5432',
  "db_name":argv.db_name||'zeromq',
  "db_user":argv.db_user||'postgres',
  "db_pwd":argv.db_host||'1111'
};

writeConfig(str);
var str=`tcp://${str.broker_host}:3000`;

var socket=sub.connect(str);
socket.subscribe('app_in');
console.log('Subscriber connected to '+str);

socket.on(`message`, (topic,msg)=>{
  console.log(`Client send ${msg}`);
});

function writeConfig(str) {
  var writeStream = fs.createWriteStream("config.json"); // создаем поток
  writeStream.write(JSON.stringify(str)); // пишем
  writeStream.end();
}
