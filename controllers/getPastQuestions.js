const handleGetPastQuestions = (req, res, db) => {
  const { Programme, Level,Trimester } = req.body;

  db.raw(
    `select trimester,url,doc,course_name from past_questions where programme = '${Programme}' and level = '${Level}' and trimester = '${Trimester}'`
  )
    .then((row) => {
      console.log(row);
      res.send(row);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  handleGetPastQuestions: handleGetPastQuestions,
};
