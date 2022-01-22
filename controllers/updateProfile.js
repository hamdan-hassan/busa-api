const hanldeUpdateProfile = (req, res, db) => {
  const {
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
    })

    .then((row) => {
      res.json("updated");
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

module.exports = {
  hanldeUpdateProfile: hanldeUpdateProfile,
};
