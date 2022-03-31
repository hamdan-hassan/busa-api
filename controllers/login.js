const handleLogin = (req, res, db, bcrypt) => {
  db.select("email", "hash", "role")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      if (data.length === 0) {
        return res.json("not found");
      }
      bcrypt.compare(req.body.password, data[0].hash, function (err, response) {
        if (response && data[0].role !== "User") {
          // res.send({
          //   role: "admin",
          // });

          switch (data[0].role) {
            case 'Admin':
              res.send({
                role: "admin",
              });
              break;

            case 'Marketing HOD':
              res.send({
                role: "marketing",
              });
              break;

            case 'Management HOD':
              res.send({
                role: "management",
              });
              break;

            case 'Banking and Finance HOD':
              res.send({
                role: "banking and finance",
              });
              break;

            case 'Accountancy HOD':
              res.send({
                role: "accountancy",
              });
              break;


          }

        } else if (response && data[0].role !== "Admin") {
          return db
            .select(
              "std_id",
              "first_name",
              "middle_name",
              "last_name",
              "email",
              "level",
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
