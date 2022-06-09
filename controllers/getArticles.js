const handleGetArticles = (req, res, db) => {
  db.raw(
    "select title, content,article_id,  TO_CHAR(upload_date, 'Mon dd, yyyy') as date from articles order by upload_date desc offset 0 limit 10"
  ).then((row) => res.json(row)).catch(err => {
    res.json(err)
  });
};

module.exports = {
  handleGetArticles: handleGetArticles,
};
