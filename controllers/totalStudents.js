const handleTotalStudents = (req, res, db) => {
  db("registration")
    .count("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  handleTotalStudents: handleTotalStudents,
};
