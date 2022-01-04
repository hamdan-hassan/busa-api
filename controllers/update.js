const handleUpdate = (req, res, db) => {
  const { stdid, level100, level200, level300, level400, tshirt, books } =
    req.body;

  db.transaction((trx) => {
    return db("dues")
      .where({ std_id: stdid })
      .update({
        level_100: level100,
        level_200: level200,
        level_300: level300,
        level_400: level400,
      })

      .then(() => {
        return db("souvenirs")
          .where({
            std_id: stdid,
          })
          .update({
            t_shirt: tshirt,
            books: books,
          });
      })
      .then((row) => res.status(200))
      .then(trx.commit)
      .catch((err) => res.status(400));
  });
};

module.exports = {
  handleUpdate: handleUpdate,
};
