const handleRegister = (req, res, db) => {
  const {
    FirstName,
    MiddleName,
    LastName,
    StudentID,
    Level,
    Gender,
    Size,
    isValid,
  } = req.body;

  if (isValid) {
    db("registration")
      .update({
        std_id: StudentID.toUpperCase(),
        first_name: FirstName,
        middle_name: MiddleName,
        last_name: LastName,
        gender: Gender,
        size: Size,
        level: Level,
        registered: "true",
      })
      .where({
        std_id: StudentID.toUpperCase(),
      })
      .then((res) => {
        console.log(res);
      }).catch(err => res.json(err));
  }

  if (!isValid) {
    res.send("wrong id");
  }
};

module.exports = {
  handleRegister: handleRegister,
};
