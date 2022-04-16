const handleProfileImage = (req, res, db) => {
  const { StudentID, Level, ProgrammeType } = req.body;

  db("profile_images")
    .insert({
      std_id: StudentID.toUpperCase(),
      level: Level,
      programme_type: ProgrammeType
    })
    .then((row) => {
      res.json(row)
    }).catch(err => {
      res.json(err)
    });
};

module.exports = {
  handleProfileImage: handleProfileImage,
};
