const handleUploadPastQuestions = (req, res, db) => {
  const { Programme, Level, Trimester, Url } = req.body;

  db("past_questions")
    .insert({
      programme: Programme,
      level: Level,
      trimester: Trimester,
      url: Url,
    })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  handleUploadPastQuestions: handleUploadPastQuestions,
};
