const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // require package
const morgan = require("morgan");

// ===================Import Models====================
const HorrorModel = require('./models/horrorMovies');

const app = express();
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Connected to mongoDB ${mongoose.connection.name}.`);
});
app.listen(3000, () => {
  console.log("Listening on port 3000!!")
})




// =================MiddleWare==================

app.use(express.urlencoded({extended: false}));

app.use(morgan('dev'));

//==================Routes======================

// The Create Routes==============================
app.get('/movies/new', (req, res) => {
  console.log(req.body)
  res.render('movies/new.ejs')
})

app.post('/movies', async (req, res) => {
  const movie = await HorrorModel.create(req.body);
  console.log(movie);
  res.redirect('/movies');
})



// The Read Routes================================

// The Index Routes===============================

// The Show Routes================================

// The Edit Routes================================

// The Delete Routes==============================








// ================================================

// /GET/
app.get("/", async (req, res) => {
  res.render("index.ejs");
});