const handleGetStudents = (req, res, db) => {
  db.select(
    "users.std_id",
    "users.first_name",
    "users.level",
    "programme",
    "level_100",
    "level_200",
    "level_300",
    "level_400",
    "t_shirt",
    "books",
    "email",
    "status",
    "registered",
    "phone_number"
  )
    .from("users")
    .innerJoin("dues", "users.std_id", "dues.std_id")
    .innerJoin("souvenirs", "users.std_id", "souvenirs.std_id")
    .innerJoin("registration", "users.std_id", "registration.std_id")
    .then((row) => res.json(row))
    .catch((err) => {
      res.status(400).json("error fetching data");
    });
};

module.exports = {
  handleGetStudents: handleGetStudents,
};
