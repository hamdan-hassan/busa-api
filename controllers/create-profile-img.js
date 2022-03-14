const handleProfileImage = (req, res, db) => {
  const { StudentID, Level } = req.body;

  db("profile_images")
    .insert({
      std_id: StudentID.toUpperCase(),
      level: Level,
      programme_type: ProgrammeType
    })
    .then((res) => {
      console.log(res);
    });
};

module.exports = {
  handleProfileImage: handleProfileImage,
};
