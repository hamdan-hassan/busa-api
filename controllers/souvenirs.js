const handleSouvenirs = (req, res, db) => {
  const { StudentID } = req.body;
  db("souvenirs")
    .select("*")
    .where({ std_id: StudentID.toUpperCase() })
    .then((row) => {
      res.json(row);
    }).catch(err => res.json(err));
};

module.exports = {
  handleSouvenirs: handleSouvenirs,
};
