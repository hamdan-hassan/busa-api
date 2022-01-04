const handleUploadHandouts = (req, res, db) => {
  const { Programme, Level, Trimester, CourseName, Url } = req.body;

  db("handouts")
    .insert({
      programme: Programme,
      level: Level,
      course_name: CourseName,
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
  handleUploadHandouts: handleUploadHandouts,
};
