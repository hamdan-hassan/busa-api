const handleProfileImage = (req, res, db) => {
  const { StudentID } = req.body;

  db("profile_images")
    .insert({
      std_id: StudentID.toUpperCase(),
    })
    .then((res) => {
      console.log(res);
    });
};

module.exports = {
  handleProfileImage: handleProfileImage,
};
