const handleGenderStats = (req, res, db) => {
  let arr = [];

  db("registration")
    .count("*")
    .where("gender", "Male")
    .then((data) => {
      arr.push(data[0]);
    });

  db("registration")
    .count("*")
    .where("gender", "Female")
    .then((data) => {
      arr.push(data[0]);
      res.json(arr);
    });
};

module.exports = {
  handleGenderStats: handleGenderStats,
};
