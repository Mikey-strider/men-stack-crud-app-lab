// ===================Import Models====================


const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path')

const movieCtrl = require('./controllers/movies');


const app = express();

require('./config/database.js');
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

app.get('/movies/:moviesId/update', movieCtrl.edit);

app.put('/movies/:movieId', movieCtrl.update);

// The Delete Routes==============================


app.delete('/movies/:movieId', movieCtrl.delete);


// The Create Routes==============================
app.get('/movies/new', movieCtrl.new);

app.post('/movies', movieCtrl.create);


// The Show Routes================================

app.get('/movies/:movieId', movieCtrl.show);


// The Read Routes================================

// The Index Routes===============================

app.get('/movies', movieCtrl.index);



// ================================================

// /GET/
app.get("/", async (req, res) => {
  res.redirect("/movies");
});