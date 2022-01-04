const handleIsRegistered = (req, res, db) => {
  const { id } = req.params;
  db("registration")
    .select("registered", "first_name")
    .where({ std_id: id.toUpperCase() })
    .then((row) => {
      res.json(row);
    });
};

module.exports = {
  handleIsRegistered: handleIsRegistered,
};
