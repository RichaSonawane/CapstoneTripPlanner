require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const { userLogin, userSignup } = require("./controllers/authController");
const { seed } = require("./controllers/db/seed.db.controller");
const {
  getList,
  createList,
  deleteList,
  updateList
} = require("./controllers/listController");

// //entry-point for app
// app.get('/',(req,res)=> {
//     res.sendFile(path.join(__dirname,'../public/index.html'))
// })

app.get(`/api/list`, getList);
app.post(`/api/list`, createList);
app.delete(`/api/list/:id`,deleteList)
app.put(`/api/list/:id`, updateList);

//auth endpoints
app.post("/api/login", userLogin);
app.post("/api/signUp", userSignup);

//seed endpoint
app.post("/api/seed", seed);

app.listen(4040, () => console.log(`server running on 4040`));
