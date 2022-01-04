const handleDues = (req, res, db) => {
  const { id } = req.params;
  db("dues")
    .select("*")
    .where({ std_id: id })
    .then((row) => {
      res.json(row);
    });
};

module.exports = {
  handleDues: handleDues,
};
