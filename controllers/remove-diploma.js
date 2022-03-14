const handleRemoveDiploma = (req, res, db) => {
    const { level } = req.params;


    db("users")
        .where({ programme_type: "Diploma", level: level.toString() })
        .del()
        .then(() => {
            db("dues")
                .where({ programme_type: "Diploma", level: level.toString() })
                .del()
                .then(() => db("souvenirs").where({ programme_type: "Diploma", level: level.toString() }).del())
                .then(() =>
                    db("profile_images").where({ programme_type: "Diploma", level: level.toString() }).del()
                )
                .then(() => {
                    res.status(200).json("deleted 2");
                });
        })
        .catch((err) => res.status(400).json({ dbError: "db error" }));

};

module.exports = {
    handleRemoveDiploma: handleRemoveDiploma,
};
