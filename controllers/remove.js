const handleRemove = (req, res, db) => {
  const { id } = req.params;

  db("users")
    .where("std_id", id)
    .del()
    .then(() => {
      db("dues")
        .where("std_id", id.toUpperCase())
        .del()
        .then(() => db("souvenirs").where("std_id", id.toUpperCase()).del())
        .then(() =>
          db("profile_images").where("std_id", id.toUpperCase()).del()
        )
        .then(() => {
          res.status(200).json("deleted");
        });
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

module.exports = {
  handleRemove: handleRemove,
};
