const handleRemove = (req, res, db) => {
  const { id, level } = req.params;

  if (level === "null") {
    db("users")
      .where("std_id", id.toUpperCase())
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
  } else {
    db("users")
      .where("level", level.toString())
      .del()
      .then(() => {
        db("dues")
          .where("level", level.toString())
          .del()
          .then(() => db("souvenirs").where("level", level.toString()).del())
          .then(() =>
            db("profile_images").where("level", level.toString()).del()
          )
          .then(() => {
            res.status(200).json("deleted 2");
          });
      })
      .catch((err) => res.status(400).json({ dbError: "db error" }));
  }
};

module.exports = {
  handleRemove: handleRemove,
};
