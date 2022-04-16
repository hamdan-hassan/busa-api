const handleDues = (req, res, db) => {
  const { id } = req.params;
  db("dues")
    .select("*")
    .where({ std_id: id })
    .then((row) => {
      res.json(row);
    }).catch(err => {
      res.json(err)
    });
};

module.exports = {
  handleDues: handleDues,
};
