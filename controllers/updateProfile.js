const hanldeUpdateProfile = (req, res, db) => {
  const {
    stdId,
    id,
    firstName,
    middleName,
    lastName,
    email,
    phone,
    dob,
    gender,
    level,
  } = req.body;

  db("users")
    .where({ std_id: id })
    .update({
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email: email,
      phone_number: phone,
      dob: dob,
      gender: gender,
      level: level,
      std_id: stdId,
    })
    .then(() => {
      db("dues")
        .where({ std_id: id })
        .update({ std_id: stdId })
        .then((resp) => {})
        .catch((err) => {
          console.log(err);
        });
    })
    .then(() => {
      db("login")
        .where({ std_id: id })
        .update({ std_id: stdId })
        .then((resp) => {})
        .catch((err) => {
          console.log(err);
        });
    })
    .then(() => {
      db("profile_images")
        .where({ std_id: id })
        .update({ std_id: stdId })
        .then((resp) => {})
        .catch((err) => {
          console.log(err);
        });
    })
    .then(() => {
      db("souvenirs")
        .where({ std_id: id })
        .update({ std_id: stdId })
        .then((resp) => {})
        .catch((err) => {
          console.log(err);
        });
    })
    .then(() => {
      db("registration")
        .where({ std_id: id })
        .update({ std_id: stdId })
        .then((resp) => {})
        .catch((err) => {
          console.log(err);
        });
    })
    .then((row) => {
      res.json("updated");
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

module.exports = {
  hanldeUpdateProfile: hanldeUpdateProfile,
};
