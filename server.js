const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const createAccount = require("./controllers/create-account");
const register = require("./controllers/register");
const article = require("./controllers/article");
const getArticle = require("./controllers/getArticle");
const login = require("./controllers/login");
const isRegistered = require("./controllers/isRegistered");
const profile = require("./controllers/profile");
const updateProfile = require("./controllers/updateProfile");
const dues = require("./controllers/dues");
const souvenirs = require("./controllers/souvenirs");
const getStudents = require("./controllers/getStudents");
const update = require("./controllers/update");
const totalStduents = require("./controllers/totalStudents");
const courseStats = require("./controllers/courseStats");
const tshirtStats = require("./controllers/tshirtStats");
const genderStats = require("./controllers/genderStats");
const remove = require("./controllers/remove");
const removeRegister = require("./controllers/remove-register");
const removeLogin = require("./controllers/remove-login");
const forgotPassword = require("./controllers/forgot-password");
const reset = require("./controllers/reset");
const updatePassword = require("./controllers/changePassword");
const uploadHandouts = require("./controllers/uploadHandouts");
const uploadedHandouts = require("./controllers/uploadedHandouts");
const deleteHandout = require("./controllers/deleteHandout");
const uploadPastQuestions = require("./controllers/uploadPastQuestions");
const uploadedPastQuestion = require("./controllers/uploadedPastQuestions");
const deletePastQuestions = require("./controllers/deletePastQuestion");
const getHandouts = require("./controllers/getHandouts");
const getPastQuestions = require("./controllers/getPastQuestions");
const profileImage = require("./controllers/create-profile-img");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "code123",
    database: "busa",
  },
});

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//login api
app.post("/login", (req, res) => {
  login.handleLogin(req, res, db, bcrypt);
});

app.get("/isRegistered/:id", (req, res) => {
  isRegistered.handleIsRegistered(req, res, db);
});

app.get("/dues/:id", (req, res) => {
  dues.handleDues(req, res, db);
});

app.get("/souvenirs/:id", (req, res) => {
  souvenirs.handleSouvenirs(req, res, db);
});

app.get("/getStudents", (req, res) => {
  getStudents.handleGetStudents(req, res, db);
});

app.post("/forgot-password", (req, res) => {
  forgotPassword.handleForgotPassword(req, res, db, jwt, nodemailer);
});

app.post("/upload-handouts", (req, res) => {
  uploadHandouts.handleUploadHandouts(req, res, db);
});

app.post("/upload-past-questions", (req, res) => {
  uploadPastQuestions.handleUploadPastQuestions(req, res, db);
});

app.post("/reset/:id/:pass/:token", (req, res) => {
  reset.handleReset(req, res, db, bcrypt, jwt);
});

app.get("/getArticle", (req, res) => {
  getArticle.handleGetArticle(req, res, db);
});

app.post("/create-account", (req, res) => {
  createAccount.handleCreateAccount(req, res, db, bcrypt);
});

app.get("/uploaded-handouts", (req, res) => {
  uploadedHandouts.handleUploadedHandouts(req, res, db);
});

app.post("/get-handouts", (req, res) => {
  getHandouts.handleGetHandouts(req, res, db);
});

app.post("/get-past-questions", (req, res) => {
  getPastQuestions.handleGetPastQuestions(req, res, db);
});

app.get("/uploaded-past-questions", (req, res) => {
  uploadedPastQuestion.handleUploadedPastQuestions(req, res, db);
});

app.put("/update", (req, res) => {
  update.handleUpdate(req, res, db);
});

app.delete("/remove/:id", (req, res) => {
  remove.handleRemove(req, res, db);
});

app.delete("/delete-handout/:sno", (req, res) => {
  deleteHandout.handleDeleteHandout(req, res, db);
});

app.delete("/delete-past-question/:sno", (req, res) => {
  deletePastQuestions.handleDeletePastQuestions(req, res, db);
});

app.delete("/remove-register/:id", (req, res) => {
  removeRegister.handleRemoveRegister(req, res, db);
});

app.delete("/remove-login/:id", (req, res) => {
  removeLogin.handleRemoveLogin(req, res, db);
});

app.put("/updateProfile", (req, res) => {
  updateProfile.hanldeUpdateProfile(req, res, db);
});

app.put("/updatePassword", (req, res) => {
  updatePassword.handleChangePassword(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db);
});

app.post("/create-profile-img", (req, res) => {
  profileImage.handleProfileImage(req, res, db);
});

app.put("/article", (req, res) => {
  article.handleArticle(req, res, db);
});

app.get("/courseStats", (req, res) => {
  courseStats.handleCourseStats(req, res, db);
});

app.get("/tshirtStats", (req, res) => {
  tshirtStats.handleTshirtStats(req, res, db);
});

app.get("/genderStats", (req, res) => {
  genderStats.handleGenderStats(req, res, db);
});

app.get("/totalStduents", (req, res) => {
  totalStduents.handleTotalStudents(req, res, db);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/upload", (req, res) => {
  const { ImageData, Id } = req.body;

  db("profile_images")
    .update({
      img_data: ImageData,
    })
    .where("std_id", "=", Id)
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/img", (req, res) => {
  const { Id } = req.body;
  db("profile_images")
    .select("img_data")
    .where({ std_id: Id })
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/uploadids", (req, res) => {
  const { IDs, Level } = req.body;

  IDs.forEach((item, index, arr) => {
    db("student_ids")
      .insert({
        std_id: item,
        level: Level,
      })
      .then((row) => {
        if (index + 1 === arr.length) {
          res.send("success");
        }
      })
      .catch((err) => {
        if (index + 1 === arr.length) {
          res.send("error");
        }
      });
  });
});

app.get("/uploaded-ids", (req, res) => {
  db.select("*")
    .from("student_ids")
    .then((row) => {
      res.send(row);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put("/remove-img", (req, res) => {
  const { Id } = req.body;
  db("profile_images")
    .update({
      img_data: null,
    })
    .where("std_id", "=", Id)
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/delete-id/:id", (req, res) => {
  const { id } = req.params;

  db("student_ids")
    .where("std_id", id)
    .del()
    .then((row) => {
      res.send("deleted");
    })
    .catch((err) => {
      res.send("error");
    });
});

app.delete("/delete-ids/:level", (req, res) => {
  const { level } = req.params;

  db("student_ids")
    .where("level", level)
    .del()
    .then((row) => {
      res.send("deleted");
    })
    .catch((err) => {
      console.log(err.toString());
      res.send("error");
    });
});

app.post("/validateid", (req, res) => {
  const { ID, Level } = req.body;
  db("student_ids")
    .select("std_id", "level")
    .where({
      std_id: ID,
      level: Level,
    })
    .then((row) => {
      console.log(row);

      if (row.length) {
        res.json("true");
      } else {
        res.json("false");
      }
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

app.listen(3000);
