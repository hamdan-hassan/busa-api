const handleCourseStats = (req, res, db) => {
  let arr = [];
  db("users")
    .count("*")
    .where("programme", "BCom(Human Resource Management)")
    .then((data) => {
      arr.push(data[0]);
    });

  db("users")
    .count("*")
    .where("programme", "BCom(Accounting)")
    .then((data) => {
      arr.push(data[0]);
    });

  db("users")
    .count("*")
    .where("programme", "BCom(Banking and Finance)")
    .then((data) => {
      arr.push(data[0]);
    });

  db("users")
    .count("*")
    .where("programme", "BCom(Marketing)")
    .then((data) => {
      arr.push(data[0]);
    });

  db("users")
    .count("*")
    .where("programme", "Bsc Accounting")
    .then((data) => {
      arr.push(data[0]);
    });

  db("users")
    .count("*")
    .where("programme", "Bsc Accounting and Finance")
    .then((data) => {
      arr.push(data[0]);
    });

  db("users")
    .count("*")
    .where("programme", "BA Integreated Business Studies")
    .then((data) => {
      arr.push(data[0]);
    });

  db("users")
    .count("*")
    .where("programme", "BA Accounting")
    .then((data) => {
      arr.push(data[0]);
    });

  db("users")
    .count("*")
    .where("programme", "BA Management")
    .then((data) => {
      arr.push(data[0]);
    });

  db("users")
    .count("*")
    .where("programme", "Diploma Integrated Business Studies")
    .then((data) => {
      arr.push(data[0]);
      res.json(arr);
    });
};

module.exports = {
  handleCourseStats: handleCourseStats,
};
