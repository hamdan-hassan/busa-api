const handleRemoveDiplomaLogin = (req, res, db) => {
    const { level } = req.params;

    db("login")
        .where({ programme_type: "Diploma", level: level.toString() })
        .del()
        .then(() => {
            res.status(200).json("deleted 2");
        })
        .catch((err) => res.status(400).json({ dbError: "db error" }));

};

module.exports = {
    handleRemoveDiplomaLogin: handleRemoveDiplomaLogin,
};
