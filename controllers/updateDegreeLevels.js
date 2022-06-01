const handleUpdateDegreeLevels = (req, res, db) => {
  const { fromlevel, tolevel } =
    req.body;
  db.transaction((trx) => {
    return db("dues")
      .where({ level: fromlevel,programme_type: "Degree" })
      .update({
        level: tolevel,
      })

      .then(() => {
        return db("souvenirs")
          .where({
            level: fromlevel,programme_type: "Degree" 
          })
          .update({
            level: tolevel,
          });
      })
      .then(() => {
        return db("users")
          .where({
            level: fromlevel,programme_type: "Degree" 
          })
          .update({
            level: tolevel,

          });

      })
      .then(() => {
        return db("login")
          .where({
            level: fromlevel,programme_type: "Degree"
          })
          .update({
            level: tolevel,

          });
      })
      .then(() => {
        return db("registration")
          .where({
             level: fromlevel,programme_type: "Degree"
          })
          .update({
            level: tolevel,

          });
      })
      .then(() => {
        return db("profile_images")
          .where({
            level: fromlevel,programme_type: "Degree"
          })
          .update({
            level: tolevel,

          });
      })
      .then((row) => res.json("ok"))
      .then(trx.commit)
      .catch((err) => res.status(400));
  });
};

module.exports = {
  handleUpdateDegreeLevels: handleUpdateDegreeLevels,
};
