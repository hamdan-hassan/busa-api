const handleReset = (req, res, db, bcrypt, jwt) => {
  const { id, pass, token } = req.params;

  let hash = "";

  db("login")
    .select("hash")
    .where("token", token)
    .then((response) => {
      if (response.length) {
        hash = response[0].hash;
        const secret = process.env.JWT_SECRET + hash;
        let valid = jwt.verify(token, secret);

        if (valid) {
          const saltRounds = 10;
          const newHash = bcrypt.hashSync(pass, saltRounds);

          db("login")
            .where({ std_id: id })
            .update({ hash: newHash })
            .then((resp) => {
              res.send("success");
            })
            .catch((err) => {
              res.json(err)
            });
        } else {
          res.status(400);
        }
      } else {
        res.send("expired");
      }
    })
    .catch((err) => {
      res.send("expired");
    });
};

module.exports = {
  handleReset: handleReset,
};
