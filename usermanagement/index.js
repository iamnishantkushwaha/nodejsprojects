const express = require("express");
const app = express();
const users = require("./api/db.json");
const fs = require("fs");
const { error } = require("console");
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/api/users", (req, res) => {
  // const html=`
  // <ul>${users.map((user)=>
  // `<li>${user.first_name} ${user.last_name}</li>`).join(" ")}</ul>`
  // res.send(html)
  res.json(users);
});

app.post("/api/newuser", (req, res) => {
  const body = req.body;
  console.log(body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./api/db.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success" });
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const newusers = users.filter((user) => user.id !== id);
  fs.writeFile(
    "./api/db.json",
    JSON.stringify(newusers, null, 2),
    (error, data) => {
      users.length = 0;
      users.push(...newusers);
      return res.json(users);
    },
  );
});

app.patch("/api/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const index = users.findIndex((user) => user.id === id);
  users[index] = { ...body, id: index + 1 };
  fs.writeFile("./api/db.json", JSON.stringify(users), (error, data) => {
    return res.json({ status: "updated successfully" });
  });
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.filter((user) => user.id === id);
  return res.json(user);
});
app.listen(3000);
