const handleChangePassword = (req, res, db, bcrypt) => {
  db.select("std_id", "hash")
    .from("login")
    .where("std_id", "=", req.body.id)
    .then((data) => {
      bcrypt.compare(req.body.password, data[0].hash, function (err, response) {
        if (response) {
          if (req.body.newPass !== req.body.confirmPass) {
            return res.json("wrong");
          }
          const saltRounds = 10;
          const hash = bcrypt.hashSync(req.body.newPass, saltRounds);
          db("login")
            .where({ std_id: req.body.id })
            .update({ hash: hash })
            .then((resp) => {
              res.json("updated");
            })
            .catch((err) => {
              res.json(err);
            });
        } else {
          res.json("wrong password");
        }
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  handleChangePassword: handleChangePassword,
};
