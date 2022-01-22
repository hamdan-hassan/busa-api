const handleRemoveLogin = (req, res, db) => {
  const { id, level } = req.params;
  if (level === "null") {
    db("login")
      .where("std_id", id.toUpperCase())
      .del()
      .then(() => {
        res.status(200).json("deleted");
      })
      .catch((err) => res.status(400).json({ dbError: "db error" }));
  } else {
    db("login")
      .where("level", level.toString())
      .del()
      .then(() => {
        res.status(200).json("deleted 2");
      })
      .catch((err) => res.status(400).json({ dbError: "db error" }));
  }
};

module.exports = {
  handleRemoveLogin: handleRemoveLogin,
};
