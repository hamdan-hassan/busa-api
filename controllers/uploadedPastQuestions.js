const handleUploadedPastQuestions = (req, res, db) => {
  db.select("*")
    .from("past_questions")
    .then((row) => {
      res.send(row);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  handleUploadedPastQuestions: handleUploadedPastQuestions,
};
