const handleRemoveRegister = (req, res, db) => {
  const { id } = req.params;

  db("registration")
    .where("std_id", id.toUpperCase())
    .del()
    .then(() => {
      res.status(200).json("deleted");
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

module.exports = {
  handleRemoveRegister: handleRemoveRegister,
};
