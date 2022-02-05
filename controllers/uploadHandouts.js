const handleUploadHandouts = (req, res, db) => {
  const { Programme, Level, Trimester, CourseName, Doc, Url } = req.body;

  db("handouts")
    .insert({
      programme: Programme,
      level: Level,
      course_name: CourseName,
      doc: Doc,
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
