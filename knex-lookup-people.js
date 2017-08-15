const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    host :     settings.hostname,
    user :     settings.user,
    password : settings.password,
    database : settings.database
  },
  searchPath:'knex,public'
});

var name = process.argv[2];
var lookup = function(args){

  if(args){
    knex('famous_people').where('last_name',name).asCallback((err, rows) => {
      if (err) {
        return console.error("error running query", err);
      }
      console.log(`Found ${rows.length} person(s) by the surname '${name}':`)
      for(x in rows){
        console.log(`- ${rows[x].id}: ${rows[x].first_name} ${rows[x].last_name} born ${rows[x].birthday.toString().split(' ').slice(0,4).join(' ')}`);
      }
    });
  }else{
    knex('famous_people').select().asCallback((err, rows) => {
        if (err) {
          return console.error("error running query", err);
        }
        for(x in rows){
          console.log(`- ${rows[x].id}: ${rows[x].first_name} ${rows[x].last_name} born ${rows[x].birthday.toString().split(' ').slice(0,4).join(' ')}`);
        }

    });
  }
}

  if(!name){
    console.log('Giving whole database...');
    lookup(null);
  }else{
    console.log('Searching ...')
    lookup([name])
  }

  knex.destroy(function(){
    console.log('Done');
  })
