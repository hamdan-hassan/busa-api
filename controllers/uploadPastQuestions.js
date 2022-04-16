const handleUploadPastQuestions = (req, res, db) => {
  const { Programme, Level, Trimester,CourseName, Doc, Url } = req.body;

  db("past_questions")
    .insert({
      programme: Programme,
      level: Level,
      course_name: CourseName,
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
