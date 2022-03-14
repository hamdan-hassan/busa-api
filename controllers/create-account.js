const handleCreateAccount = (req, res, db, bcrypt) => {
  const {
    FirstName,
    MiddleName,
    LastName,
    StudentID,
    DateOfBirth,
    Gender,
    Level,
    Programme,
    ProgrammeType,
    PhoneNumber,
    Email,
    Password,
  } = req.body;

  const saltRounds = 10;
  const hash = bcrypt.hashSync(Password, saltRounds);

  db.transaction((trx) => {

    if (Email === 'info.busa99@gmail.com') {
      res.send("already exist")
    }

    db.raw(
      `select std_id, email from users where std_id = '${StudentID}' or email = '${Email}'`
    )
      .then((resp) => {
        if (resp.rows.length) {
          res.send("already exist");
          return;
        } else {
          trx
            .insert({
              hash: hash,
              email: Email,
              std_id: StudentID.toUpperCase(),
              level: Level,
              programme_type: ProgrammeType
            })
            .into("login")
            .returning("email")
            .then((loginEmail) => {
              return trx("users")
                .returning("*")
                .insert({
                  first_name: FirstName,
                  middle_name: MiddleName,
                  last_name: LastName,
                  std_id: StudentID.toUpperCase(),
                  dob: DateOfBirth,
                  gender: Gender,
                  programme_type: ProgrammeType,
                  programme: Programme,
                  phone_number: PhoneNumber,
                  email: loginEmail[0],
                  level: Level,
                })
                .returning("std_id")
                .then((dueId) => {
                  return trx("dues")
                    .returning("*")
                    .insert({
                      std_id: dueId[0].toUpperCase(),
                      level: Level,
                      programme_type: ProgrammeType,
                      level_100: "Pending",
                      level_200: "Pending",
                      level_300: "Pending",
                      level_400: "Pending",
                    })
                    .returning("std_id")
                    .then((souvenirId) => {
                      return trx("souvenirs").returning("*").insert({
                        std_id: souvenirId[0].toUpperCase(),
                        level: Level,
                        programme_type: ProgrammeType,
                        t_shirt: "Pending",
                        books: "Pending",
                      });
                    });
                })
                .then((user) => res.json(user[0]))
                .then(trx.commit)
                .catch(trx.rollback)
                .catch((err) => res.status(400).json(err));
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = {
  handleCreateAccount: handleCreateAccount,
};
