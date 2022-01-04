const handleGetHandouts = (req, res, db) => {
  const { Programme, Level, Trimester } = req.body;

  db.raw(
    `select trimester,course_name,url from handouts where programme = '${Programme}' and level = '${Level}' and trimester = '${Trimester}'`
  )
    .then((row) => {
      res.send(row);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  handleGetHandouts: handleGetHandouts,
};
