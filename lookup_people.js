const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
var name = process.argv[2];
var lookup = function(query,args){

  if(args){
    client.query(query, args,
      (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      console.log(`Found ${result.rows.length} person(s) by the surname '${name}':`)
      for(x in result.rows){
        console.log(`- ${x}: ${result.rows[x].first_name} ${result.rows[x].last_name} born ${result.rows[x].birthday.toString().split(' ').slice(0,3).join(' ')}`);
      }
      client.end();
    });
  }else{
      client.query(query, args,
        (err, result) => {
        if (err) {
          return console.error("error running query", err);
        }
        for(x in result.rows){
          console.log(`- ${x}: ${result.rows[x].first_name} ${result.rows[x].last_name} born ${result.rows[x].birthday.toString().split(' ').slice(0,3).join(' ')}`);
        }
        client.end();
    });
  }


}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  if(!name){
    console.log('Giving whole database...');
    lookup('SELECT * FROM famous_people;',null);
  }else{
    console.log('Searching ...')
    lookup(`SELECT * FROM famous_people
                  WHERE last_name=$1;`,[name])
  }
});
