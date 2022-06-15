const handleIsRegistered = (req, res, db) => {
  const { id } = req.params;
  db("registration")
    .select("registered", "first_name","last_name")
    .where({ std_id: id.toUpperCase() })
    .then((row) => {
      res.json(row);
    }).catch(err => {
      res.json(err)
    });
};

module.exports = {
  handleIsRegistered: handleIsRegistered,
};
