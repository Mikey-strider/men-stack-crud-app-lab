const HorrorModel = require('../models/horrorMovie');


const index = async (req, res) => {
  try {
    const horrorDocs = await HorrorModel.find({});
    res.render('movies/index.ejs', { horrorDocs });
  } catch (err) {
    res.send(err)
  }

}

const show = async (req, res) => {
  try {
    const horrorDoc = await HorrorModel.findById(req.params.movieId);
    res.render('movies/show.ejs', { horrorDoc });
  } catch (err) {
    res.send(err)
  }

}

const newOne = (req, res) => {
  console.log(req.body)
  res.render('movies/new.ejs')
}

const create = async (req, res) => {
  try {
    const movie = await HorrorModel.create(req.body);
    console.log(movie);
    res.redirect('/movies');
  } catch (err) {
    res.send(err)
  }

}

const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await HorrorModel.findByIdAndDelete(req.params.fruitId);
    res.redirect('/movies');
  } catch (err) {
    res.send(err)
  }

}

const edit = async (req, res) => {
  try {
    const horrorDoc = await HorrorModel.findByIdAndUpdate(req.params.moviesId)
    res.render('movies/update.ejs', { horrorDoc })
  } catch (err) {
    res.send(err)
  }

}

const updateMovie = async (req, res) => {
  try {
    const updateHorror = await HorrorModel.findByIdAndUpdate(req.params.movieId, req.body, { new: true });
    res.redirect(`/movies/${req.params.movieId}`);
  } catch (err) {
    res.send(err)
  }
}




module.export = {
  index,
  edit,
  show,
  newOne,
  create,
  deleteMovie,
  updateMovie,
}