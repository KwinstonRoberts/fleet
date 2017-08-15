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

var person = {
  first_name: process.argv[2],
  last_name: process.argv[3],
  birthday: new Date(process.argv[4])
};

knex('famous_people').insert(person).asCallback(
  (err) => {
    if (err) {
      return console.error("error running query", err);
    }
  console.log(`added ${person.first_name} ${person.last_name}`)
});

knex.destroy(function(){
  console.log('Done');
})
