const handleUploadPastQuestions = (req, res, db) => {
  const { Programme, Level, Trimester, Doc, Url } = req.body;

  db("past_questions")
    .insert({
      programme: Programme,
      level: Level,
      trimester: Trimester,
      doc: Doc,
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
