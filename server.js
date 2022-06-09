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
const uploadArticle = require("./controllers/uploadarticle");
const getArticles = require("./controllers/getArticles");
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
const removeDiploma = require("./controllers/remove-diploma")
const removeRegister = require("./controllers/remove-register");
const removeDiplomaRegister = require("./controllers/remove-register-diploma")
const removeLogin = require("./controllers/remove-login");
const removeDiplomaLogin = require("./controllers/remove-login-diploma")
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
const updateDegreeLevels = require("./controllers/updateDegreeLevels")
const updateDiplomaLevels = require("./controllers/updateDiplomaLevels")
const getPastQuestions = require("./controllers/getPastQuestions");
const profileImage = require("./controllers/create-profile-img");
const { response } = require("express");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: "busa",
  },
});

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//login api
app.post("/api/login", (req, res) => {
  login.handleLogin(req, res, db, bcrypt);
});

app.get("/api/isRegistered/:id", (req, res) => {
  isRegistered.handleIsRegistered(req, res, db);
});

app.get("/api/dues/:id", (req, res) => {
  dues.handleDues(req, res, db);
});

app.get("/api/souvenirs/:id", (req, res) => {
  souvenirs.handleSouvenirs(req, res, db);
});

app.get("/api/getStudents", (req, res) => {
  getStudents.handleGetStudents(req, res, db);
});

app.post("/api/forgot-password", (req, res) => {
  forgotPassword.handleForgotPassword(req, res, db, jwt, nodemailer);
});

app.post("/api/upload-handouts", (req, res) => {
  uploadHandouts.handleUploadHandouts(req, res, db);
});

app.post("/api/upload-past-questions", (req, res) => {
  uploadPastQuestions.handleUploadPastQuestions(req, res, db);
});

app.post("/api/reset/:id/:pass/:token", (req, res) => {
  reset.handleReset(req, res, db, bcrypt, jwt);
});

app.get("/api/getArticles", (req, res) => {
  getArticles.handleGetArticles(req, res, db);
});

app.post("/api/create-account", (req, res) => {
  createAccount.handleCreateAccount(req, res, db, bcrypt);
});

app.get("/api/uploaded-handouts", (req, res) => {
  uploadedHandouts.handleUploadedHandouts(req, res, db);
});

app.put("/api/update-degree-levels", (req,res) => {

  updateDegreeLevels.handleUpdateDegreeLevels(req, res, db);
})

app.put("/api/update-diploma-levels", (req,res) => {

  updateDiplomaLevels.handleUpdateDiplomaLevels(req, res, db);
})

app.post("/api/get-handouts", (req, res) => {
  getHandouts.handleGetHandouts(req, res, db);
});

app.post("/api/get-past-questions", (req, res) => {
  getPastQuestions.handleGetPastQuestions(req, res, db);
});

app.get("/api/uploaded-past-questions", (req, res) => {
  uploadedPastQuestion.handleUploadedPastQuestions(req, res, db);
});

app.put("/api/update", (req, res) => {
  update.handleUpdate(req, res, db);
});

app.delete("/api/remove/:id/:level", (req, res) => {
  remove.handleRemove(req, res, db);
});

app.delete("/api/remove-diploma/:level", (req, res) => {
  removeDiploma.handleRemoveDiploma(req, res, db)
});


app.delete("/api/delete-handout/:sno", (req, res) => {
  deleteHandout.handleDeleteHandout(req, res, db);
});

app.delete("/api/delete-past-question/:sno", (req, res) => {
  deletePastQuestions.handleDeletePastQuestions(req, res, db);
});

app.delete("/api/remove-register/:id/:level", (req, res) => {
  removeRegister.handleRemoveRegister(req, res, db);
});

app.delete("/api/remove-register-diploma/:level", (req, res) => {
  removeDiplomaRegister.handleRemoveDiplomaRegister(req, res, db)
});

app.delete("/api/remove-login/:id/:level", (req, res) => {
  removeLogin.handleRemoveLogin(req, res, db);
});

app.delete("/api/remove-login-diploma/:level", (req, res) => {
  removeDiplomaLogin.handleRemoveDiplomaLogin(req, res, db)
});

app.put("/api/updateProfile", (req, res) => {
  updateProfile.hanldeUpdateProfile(req, res, db);
});

app.put("/api/updatePassword", (req, res) => {
  updatePassword.handleChangePassword(req, res, db, bcrypt);
});

app.put("/api/register", (req, res) => {
  register.handleRegister(req, res, db);
});

app.post("/api/create-profile-img", (req, res) => {
  profileImage.handleProfileImage(req, res, db);
});

app.post("/api/publish-article", (req, res) => {
  uploadArticle.handleUploadArticle(req, res, db);
});

app.get("/api/courseStats", (req, res) => {
  courseStats.handleCourseStats(req, res, db);
});

app.get("/api/registered-students", (req, res) => {
  db("registration")
    .count("*")
    .where("registered", "true")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.get("/api/not-registered-students", (req, res) => {
  db("registration")
    .count("*")
    .where("registered", "false")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.get("/api/tshirtStats", (req, res) => {
  tshirtStats.handleTshirtStats(req, res, db);
});

app.get("/api/genderStats", (req, res) => {
  genderStats.handleGenderStats(req, res, db);
});

app.get("/api/totalStduents", (req, res) => {
  totalStduents.handleTotalStudents(req, res, db);
});

app.get("/api/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/api/upload", (req, res) => {
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
      res.json(err)
    });
});

app.post("/api/img", (req, res) => {
  const { Id } = req.body;
  db("profile_images")
    .select("img_data")
    .where({ std_id: Id })
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.json(err)
    });
});

app.post("/api/uploadids", (req, res) => {
  const { IDs, Level, ProgrammeType } = req.body;

  IDs.forEach((item, index, arr) => {
    db("student_ids")
      .insert({
        std_id: item.trim(),
        level: Level,
        programme: ProgrammeType
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

app.get("/api/uploaded-ids", (req, res) => {
  db.select("*")
    .from("student_ids")
    .then((row) => {
      res.send(row);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put("/api/remove-img", (req, res) => {
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
     res.json(err)
    });
});

app.delete("/api/delete-id/:id", (req, res) => {
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

app.delete("/api/delete-ids/:level", (req, res) => {
  const { level } = req.params;

  db("student_ids")
    .where({ programme: "Degree", level: level, })
    .del()
    .then((row) => {
      res.send("deleted");
    })
    .catch((err) => {
      res.send("error");
    });
});


app.delete("/api/delete-diploma-ids/:level", (req, res) => {
  const { level } = req.params;

  db("student_ids")
    .where({ programme: "Diploma", level: level })
    .del()
    .then((row) => {
      res.send("deleted");
    })
    .catch((err) => {
      res.send("error");
    });
});


app.post("/api/validateid", (req, res) => {
  const { ID, Level } = req.body;
  db("student_ids")
    .select("std_id", "level")
    .where({
      std_id: ID,
      level: Level,
    })
    .then((row) => {

      if (row.length) {
        res.json("true");
      } else {
        res.json("false");
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/upload-key-people", (req, res) => {
  const { Name, Position, ImageData } = req.body;

  db("key_people")
    .insert({
      name: Name,
      position: Position,
      img_data: ImageData,
    })
    .then((response) => {
      res.send("updated");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/api/uploaded-key-people", (req, res) => {
  db.select("name", "position", "sno", "img_data")
    .from("key_people")
    .then((row) => {
      res.send(row);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/api/uploaded-articles", (req, res) => {
  db.select("*")
    .from("articles")
    .then((row) => {
      res.send(row);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete("/api/delete-article/:article_id", (req, res) => {

  const { article_id } = req.params



  db("articles")
    .del()
    .where({ article_id: article_id })
    .then((response) => {
      res.status(200);
    })
    .catch((err) => {
      res.send(err);
    });
});


app.put("/api/update-article", (req, res) => {
  const { article_id,title,content } = req.body;

  db("articles")
    .update({
      title: title,
      content: content
    })
    .where({
      article_id: article_id,
    })
    .then((row) => {
      res.json("updated");
    })
    .catch((err) => {
      res.json(err);
    });
});

// app.get("/api/count-articles",(req,res) => {
//  db("articles")
//     .count("*")
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// })

app.get("/api/get-article/:id", (req, res) => {
  const { id} = req.params;

db.raw(
    `select title, content,article_id,  TO_CHAR(upload_date, 'Mon dd, yyyy') as date from articles where article_id='${id}'`
  ).then((row) => res.json(row)).catch(err => {
    res.json(err)
  });
 
});


app.post("/api/complains-count", (req, res) => {
  const { Id, Count, Receiver } = req.body;

  db("complains_count")
    .insert({
      std_id: Id,
      count: Count,
      receiver: Receiver
    })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/api/send-reply", (req, res) => {
  const { Id, Current_date, Current_time, Counter, Subject, Message } =
    req.body;
  db("messages")
    .insert({
      std_id: Id,
      reply_date: Current_date,
      time: Current_time,
      counter: Counter,
      subject: Subject,
      message: Message,
    })
    .then((response) => {
      db("student_complains")
        .update({
          status: "Replied",
        })
        .where({
          subject: Subject,
        })
        .then((row) => {
          res.json(response);
        })
        .catch((err) => {
         res.json(err)
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/get-complains", (req, res) => {
  const { Receiver } = req.body

  switch (Receiver) {
    case 'admin':
      db("student_complains")
        .select("*")
        .where({
          receiver: "Busa"
        })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
      break;
    case 'marketing':
      db("student_complains")
        .select("*")
        .where({
          receiver: "Department of Procurement and Marketing"
        })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
      break;
    case 'management':
      db("student_complains")
        .select("*")
        .where({
          receiver: "Department of Management Studies"
        })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
      break;
    case 'banking and finance':
      db("student_complains")
        .select("*")
        .where({
          receiver: "Department of Banking and Finance"
        })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
      break;
    case 'accountancy':
      db("student_complains")
        .select("*")
        .where({
          receiver: "Department of Accountancy"
        })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
      break;
  }


});

app.post("/api/get-message-count", (req, res) => {
  const { Id } = req.body;
  db("messages")
    .count("counter")
    .where({
      std_id: Id,
      counter: 1,
    })
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/get-messages", (req, res) => {
  const { Id } = req.body;
  
  db.raw(
    "select sno,time, subject,message,  TO_CHAR(reply_date, 'Mon dd yyyy') as date from messages where std_id = " +
    "'" +
    Id +
    "'"
  ).then((row) => res.json(row));
});

app.post("/api/get-complains-count", (req, res) => {

  const { Receiver } = req.body

  
  db("complains_count")
    .count("*")
    .where({ receiver: Receiver })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put("/api/reset-messages-count", (req, res) => {
  const { Id } = req.body;

  db("messages")
    .update({
      counter: 0,
    })
    .where({
      std_id: Id,
    })
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/api/remove-complains-count/:receiver", (req, res) => {

  const { receiver } = req.params



  db("complains_count")
    .del()
    .where({ receiver: receiver })
    .then((response) => {
      res.status(200);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete("/api/delete-message/:sno", (req, res) => {
  const { sno } = req.params;

  db("messages")
    .del()
    .where({
      sno: sno,
    })
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/api/delete-complain/:id/:sno", (req, res) => {
  const { id, sno } = req.params;

  if (sno === "null") {
    db("student_complains")
      .del()
      .where({
        std_id: id,
      })
      .then((row) => {
        res.json(row);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  else {
    db("student_complains")
      .del()
      .where({
        sno: sno,
      })
      .then((row) => {
        res.json(row);
      })
      .catch((err) => {
        res.json(err);
      });
  }


});

app.post("/api/send-complain", (req, res) => {
  const { Date, Id, Name, Contact, Subject, Complain, Receiver } = req.body;

  db("student_complains")
    .insert({
      date_of_complain: Date,
      std_id: Id,
      name: Name,
      contact: Contact,
      subject: Subject,
      complain: Complain,
      receiver: Receiver
    })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/api/update-key-people", (req, res) => {
  const { Sno, Name } = req.body;

  db("key_people")
    .where({
      sno: Sno,
    })
    .update({
      name: Name,
    })
    .then((response) => {
      res.status(200);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete("/api/delete-key-people/:sno", (req, res) => {
  const { sno } = req.params;

  db("key_people")
    .where({
      sno: sno,
    })
    .del()
    .then((response) => {
      res.status(200);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/create-registration", (req, res) => {
  const { FirstName, MiddleName, LastName, StudentID, Level, Gender, ProgrammeType
  } =
    req.body;

  db("registration")
    .insert({
      first_name: FirstName,
      middle_name: MiddleName,
      last_name: LastName,
      gender: Gender,
      programme_type: ProgrammeType,
      std_id: StudentID.toUpperCase(),
      level: Level,
    })
    .then((row) => {
      res.json(row)
    });
});

app.listen(process.env.PORT || 3000);
