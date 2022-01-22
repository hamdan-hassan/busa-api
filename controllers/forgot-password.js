const handleForgotPassword = (req, res, db, jwt, nodemailer) => {
  const { email } = req.body;
  let hash = "";
  let std_id = "";

  db("login")
    .select("hash")
    .where("email", email)
    .then((response) => {
      if (response.length) {
        hash = response[0].hash;
      } else {
        res.send("Email does not exist");
      }
    })
    .catch((err) => {
      res.send("Error");
    });

  db("users")
    .select("std_id")
    .where("email", email)
    .then((response) => {
      if (response.length) {
        std_id = response[0].std_id;
      } else {
        console.log("error");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  db("users")
    .select("email")
    .where("email", email)
    .then((response) => {
      if (!response.length) {
        console.log("Do not exist");
        return;
      }

      const secret = process.env.JWT_SECRET + hash;

      const payload = {
        email: email,
        id: std_id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "30m" });

      db("login")
        .where({ email: email })
        .update({ token: token })
        .then((row) => {
          res.json(row);
        })
        .catch((err) => {
          console.log(err);
        });
      const link = `http://localhost:3001/reset/${std_id}/${token}`;
      // res.send(link);

      const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: process.env.NODE_MAILER_USER,
          pass: process.env.NODE_MAILER_PASS,
        },
      });

      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "Reset Password",
        text: `Reset your password with the following link. http://localhost:3001/reset/${std_id}/${token} Please note the link will expire in 30 minutes.`,
        html: `
        <p>Heard that you forgot your password. Sorry about that. Click this <a href="${link}"'>Link</a> to reset your password. The link will expire in 30 minutes</p>
        
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error, "Error");
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  handleForgotPassword: handleForgotPassword,
};
