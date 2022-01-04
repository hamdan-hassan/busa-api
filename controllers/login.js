const handleLogin = (req, res, db, bcrypt) => {
  db.select("email", "hash", "role")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      if (data.length === 0) {
        return res.json("not found");
      }
      bcrypt.compare(req.body.password, data[0].hash, function (err, response) {
        if (response && data[0].role === "Admin") {
          res.send({
            role: "admin",
          });
        } else if (response && data[0].role !== "Admin") {
          return db
            .select(
              "std_id",
              "first_name",
              "middle_name",
              "last_name",
              "email",
              "gender",
              "phone_number",
              "dob"
            )
            .from("users")
            .where("email", "=", req.body.email)
            .then((user) => {
              res.json(user);
            });
        } else {
          res.status(400).json("error logging in");
        }

        if (err) {
          res.status(400).json("ooops");
        }
      });
      // console.log(data[0].role);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  handleLogin: handleLogin,
};
