const handleProfile = (req, res, db) => {
  const { id } = req.params;

  db.raw(
    `select std_id,first_name, middle_name,last_name,email,dob,phone_number,gender,level from users where std_id = '${id}'`
  ).then((row) => res.json(row));
};

module.exports = {
  handleProfile: handleProfile,
};
