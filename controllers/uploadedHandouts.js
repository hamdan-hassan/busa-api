const handleUploadedHandouts = (req, res, db) => {
  db.select("sno", "programme", "trimester", "level", "course_name")
    .from("handouts")
    .then((row) => {
      res.send(row);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  handleUploadedHandouts: handleUploadedHandouts,
};
