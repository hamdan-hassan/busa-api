const handleDeleteHandout = (req, res, db) => {
  const { sno } = req.params;

  db("handouts")
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
  handleDeleteHandout: handleDeleteHandout,
};
