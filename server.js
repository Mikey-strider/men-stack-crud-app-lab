// ===================Import Models====================


const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // require package
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path')



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
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('dev'));

//==================Routes======================


// The Edit Routes================================

app.get('/movies/:moviesId/update', async (req, res) => {
  const horrorDoc = await HorrorModel.findByIdAndUpdate(req.params.moviesId)
  res.render('movies/update.ejs', {horrorDoc: horrorDoc})
})

app.put('/movies/:movieId', async (req, res) => {
  const updateHorror = await HorrorModel.findByIdAndUpdate(req.params.movieId, req.body, {new: true});
  res.redirect(`/movies/${req.params.movieId}`);
});

// The Delete Routes==============================


app.delete('/movies/:movieId', async (req, res) => {
  const deletedMovie = await HorrorModel.findByIdAndDelete(req.params.fruitId);
  res.redirect('/movies');
})


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


// The Show Routes================================

app.get('/movies/:movieId', async (req, res) => {
  const horrorDoc = await HorrorModel.findById(req.params.movieId);
  res.render('movies/show.ejs', {horrorDoc: horrorDoc});
})


// The Read Routes================================

// The Index Routes===============================

app.get('/movies', async (req, res) => {
  const horrorDocs = await HorrorModel.find({});
  res.render('movies/index.ejs', {horrorDocs: horrorDocs});
})










// ================================================

// /GET/
app.get("/", async (req, res) => {
  res.render("index.ejs");
});