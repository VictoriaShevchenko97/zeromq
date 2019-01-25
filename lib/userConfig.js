prompt=require('prompt');
const d = require('domain').create();

d.on('error', (er) => {
  console.log(`error,  ${er.message}`);
});

module.exports=function(cb) {
  d.run(() => {
    prompt.start();
    prompt.get([{
        name: 'type',
        required: true,
        pattern: /^login$/,
        message: 'your type must be login',
      }, {
        name: 'email',
        require:true
      },{
        name: 'pwd',
        hidden: true,
        require:true
      }

    ], (err, result) =>{
      if(err)throw err
      cb(JSON.stringify(result));
    });
  });
}
