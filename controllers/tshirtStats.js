const handleTshirtStats = (req, res, db) => {
  let arr = [];
  db("registration")
    .count("*")
    .where({ size: "Small" })
    .where({ registered: "true" })
    .where({ level: 100 })
    .then((data) => {
      arr.push(data[0]);
    });

  db("registration")
    .count("*")
    .where({size: "Medium"})
    .where({ registered: "true" })
    .where({ level: 100 })
    .then((data) => {
      arr.push(data[0]);
    });

  db("registration")
    .count("*")
    .where({size: "Large"})
    .where({ registered: "true" })
    .where({ level: 100 })
    .then((data) => {
      arr.push(data[0]);
    });

  db("registration")
    .count("*")
    .where({size: "X-Large"})
    .where({ registered: "true" })
    .where({ level: 100 })
    .then((data) => {
      arr.push(data[0]);
    });

  db("registration")
    .count("*")
    .where({size: "XX-Large"})
    .where({ registered: "true" })
    .where({ level: 100 })
    .then((data) => {
      arr.push(data[0]);
      res.json(arr);
    });
};

module.exports = {
  handleTshirtStats: handleTshirtStats,
};
