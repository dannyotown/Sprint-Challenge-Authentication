exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "testUser2",
          password:
            "$2a$14$ZisFvBR3r0SUP64LQdO4eOUP1QEsaRbmG66x/4ZSKxHgTqp1pOnPa"
        }
      ]);
    });
};
