const handleIsRegistered = (req, res, db) => {
  const { StudentID } = req.body;
  db("registration")
    .select("registered", "first_name","last_name")
    .where({ std_id: StudentID.toUpperCase() })
    .then((row) => {
      res.json(row);
    }).catch(err => {
      res.json(err)
    });
};

module.exports = {
  handleIsRegistered: handleIsRegistered,
};
