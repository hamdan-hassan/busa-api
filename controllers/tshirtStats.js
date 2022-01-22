const handleTshirtStats = (req, res, db) => {
  let arr = [];
  db("registration")
    .count("*")
    .where({ size: "Small" })
    .where({ registered: "true" })
    .then((data) => {
      arr.push(data[0]);
    });

  db("registration")
    .count("*")
    .where("size", "Medium")
    .then((data) => {
      arr.push(data[0]);
    });

  db("registration")
    .count("*")
    .where("size", "Large")
    .then((data) => {
      arr.push(data[0]);
    });

  db("registration")
    .count("*")
    .where("size", "X-Large")
    .then((data) => {
      arr.push(data[0]);
    });

  db("registration")
    .count("*")
    .where("size", "XX-Large")
    .then((data) => {
      arr.push(data[0]);
      res.json(arr);
    });
};

module.exports = {
  handleTshirtStats: handleTshirtStats,
};
