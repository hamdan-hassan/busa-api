const handleGetPastQuestions = (req, res, db) => {
  const { Programme, Level } = req.body;

  db.raw(
    `select trimester,url from past_questions where programme = '${Programme}' and level = '${Level}'`
  )
    .then((row) => {
      res.send(row);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  handleGetPastQuestions: handleGetPastQuestions,
};
