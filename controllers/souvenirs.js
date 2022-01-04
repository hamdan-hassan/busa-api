const handleSouvenirs = (req, res, db) => {
  const { id } = req.params;
  db("souvenirs")
    .select("*")
    .where({ std_id: id.toUpperCase() })
    .then((row) => {
      res.json(row);
    });
};

module.exports = {
  handleSouvenirs: handleSouvenirs,
};
