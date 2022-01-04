const handleGetArticle = (req, res, db) => {
  db.raw(
    "select title, content,  TO_CHAR(upload_date, 'Mon dd, yyyy') as date from articles"
  ).then((row) => res.json(row));
};

module.exports = {
  handleGetArticle: handleGetArticle,
};
