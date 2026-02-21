const Users = require("../models/usermodel");
const { createHmac, randomBytes } = require("crypto");
async function handlesignup(req, res) {
  console.log(req.body);
  const { fullname, email, password } = req.body;
  const profileimageurl = req.file
    ? `/profileimg/${req.file.filename}`
    : "/images/download (1).jpg";

  await Users.create({
    fullname,
    email,
    password,
    profileimageurl,
  });
  return res.redirect("/");
}

async function handlelogin(req, res) {
  const { email, password } = req.body;
  try {
    const token = await Users.ismatchpasswordandgeneratetoken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Incorrect email or password",
    });
  }
}

module.exports = { handlesignup, handlelogin };
