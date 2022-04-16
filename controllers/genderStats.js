const handleGenderStats = (req, res, db) => {
  let arr = [];

  db("registration")
    .count("*")
    .where("gender", "Male")
    .then((data) => {
      arr.push(data[0]);
    }).catch(err => {
      res.json(err)
    });

  db("registration")
    .count("*")
    .where("gender", "Female")
    .then((data) => {
      arr.push(data[0]);
      res.json(arr);
    }).catch(err => {
      res.json(err)
    });
  ;
};

module.exports = {
  handleGenderStats: handleGenderStats,
};
