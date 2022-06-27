const handleCourseStats = (req, res, db) => {
  let arr = [];
  db("users")
    .count("*")
    .where("programme", "BCom(Human Resource Management)")
    .then((data) => {
      arr.push(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });

  db("users")
    .count("*")
    .where("programme", "BCom(Accounting)")
    .then((data) => {
      arr.push(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });

  db("users")
    .count("*")
    .where("programme", "BCom(Banking and Finance)")
    .then((data) => {
      arr.push(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });

  db("users")
    .count("*")
    .where("programme", "BCom(Marketing)")
    .then((data) => {
      arr.push(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });

     db("users")
    .count("*")
    .where("programme", "BCom(Procurement and Supply Chain Management)")
    .then((data) => {
      arr.push(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });

  db("users")
    .count("*")
    .where("programme", "Bsc Accounting")
    .then((data) => {
      arr.push(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });

  db("users")
    .count("*")
    .where("programme", "Bsc Accounting and Finance")
    .then((data) => {
      arr.push(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });

  db("users")
    .count("*")
    .where("programme", "BA Integrated Business Studies (Accounting)")
    .then((data) => {
      arr.push(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });

 db("users")
    .count("*")
    .where("programme", "BA Integrated Business Studies (Management)")
    .then((data) => {
      arr.push(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });

  db("users")
    .count("*")
    .where("programme", "BA Management")
    .then((data) => {
      arr.push(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });

  db("users")
    .count("*")
    .where("programme", "Diploma in Business Studies")
    .then((data) => {
      arr.push(data[0]);
      res.json(arr);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  handleCourseStats: handleCourseStats,
};
