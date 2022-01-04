const handleRegister = (req, res, db) => {
  const { FirstName, MiddleName, LastName, StudentID, Gender, Size, isValid } =
    req.body;

  if (isValid) {
    db("registration")
      .insert({
        std_id: StudentID.toUpperCase(),
        first_name: FirstName,
        middle_name: MiddleName,
        last_name: LastName,
        gender: Gender,
        size: Size,
        registered: "true",
      })
      .then((res) => {
        console.log(res);
      });
  }

  if (!isValid) {
    res.send("wrong id");
  }
};

module.exports = {
  handleRegister: handleRegister,
};
