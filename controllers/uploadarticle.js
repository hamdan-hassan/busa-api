const handleUploadArticle = (req, res, db) => {
  const { Title, Content } = req.body;
  db.raw(
    `insert into articles values ('${Title}','${Content}',CURRENT_DATE,substr(md5(random()::text), 0, 20));`
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });

};

module.exports = {
  handleUploadArticle: handleUploadArticle,
};
