const handleProfile = (req, res, db) => {
  const { StudentID } = req.body;

  db.raw(
    `select users.std_id,users.first_name, users.middle_name,users.last_name,users.programme,email,dob,phone_number,users.gender,users.level,size from users,registration where users.std_id = registration.std_id and users.std_id = '${StudentID}'`
  ).then((row) => res.json(row)).catch(err => res.json(err));
};

module.exports = {
  handleProfile: handleProfile,
};
