const handleSouvenirs = (req, res, db) => {
  const { id } = req.params;
  db("souvenirs")
    .select("*")
    .where({ std_id: id.toUpperCase() })
    .then((row) => {
      res.json(row);
    }).catch(err => res.json(err));
};

module.exports = {
  handleSouvenirs: handleSouvenirs,
};
