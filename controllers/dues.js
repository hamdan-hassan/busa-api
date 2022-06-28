const handleDues = (req, res, db) => {
  const { StudentID} = req.body;
  db("dues")
    .select("*")
    .where({ std_id: StudentID })
    .then((row) => {
      res.json(row);
    }).catch(err => {
      res.json(err)
    });
};

module.exports = {
  handleDues: handleDues,
};
