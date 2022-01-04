const handleRemoveLogin = (req, res, db) => {
  const { id } = req.params;

  db("login")
    .where("std_id", id.toUpperCase())
    .del()
    .then(() => {
      res.status(200).json("deleted");
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

module.exports = {
  handleRemoveLogin: handleRemoveLogin,
};
