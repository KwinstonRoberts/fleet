
exports.up = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE milestones ADD famous_person_id integer REFERENCES famous_people(id)');
};

exports.down = function(knex, Promise) {
  return knex.schema.raw(`ALTER TABLE milestones DROP COLUMN famous_person_id`);
};
