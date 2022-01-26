const handleArticle = (req, res, db) => {
  const { Title, Content } = req.body;
  db.raw(
    `update articles set title = '${Title}', content = '${Content}', upload_date = CURRENT_DATE`
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });

  // db("articles")
  //   .update({
  //     title: Title,
  //     content: Content,
  //     upload_date: CURRENT_DATE,
  //   })
  //   .then((row) => {
  //     res.json(row);
  //   })
  //   .catch((err) => {
  //     res.json(err);
  //   });
};

module.exports = {
  handleArticle: handleArticle,
};
