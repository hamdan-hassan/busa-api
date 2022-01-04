const handleDeletePastQuestions = (req, res, db) => {
  const { sno } = req.params;

  db("past_questions")
    .where("sno", sno)
    .del()
    .then((response) => {
      res.send("deleted");
    })
    .catch((err) => {
      res.send("error");
    });
};

module.exports = {
  handleDeletePastQuestions: handleDeletePastQuestions,
};
