// INITIALIZATION

var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
const sqlite = require('sqlite3');
const db = new sqlite.Database('../../billboard-200.db', (err) => console.log(err));

// ROUTES

// app.get('/albums5', function(req, res, next) {
//   var lim = 5;
//   db.all('SELECT * FROM albums LIMIT ?;', [lim], (err, results) => {
//     res.send(results);
//   });
// });

app.get('/subsim', function(req, res, next) {
  var acoust = parseFloat(req.query.acousticness);
  var dance = parseFloat(req.query.danceability);
  var energy = parseFloat(req.query.energy);
  var instrum = parseFloat(req.query.instrumentalness);
  var liveness = parseFloat(req.query.liveness);
  var loudness = parseFloat(req.query.loudness);
  var speechiness = parseFloat(req.query.speechiness);
  var valence = parseFloat(req.query.valence);
  var sql = "SELECT AF.song, AF.artist, AF.date, AF.duration_ms, abs(AF.acousticness - ?) as diffAc, abs(AF.danceability - ?) as diffDa, abs(AF.energy - ?) as diffEn, abs(AF.instrumentalness - ?) as diffIn, abs(AF.liveness - ?) as diffLi, abs(AF.loudness - ?) as diffLo, abs(AF.speechiness - ?) as diffSp, abs(AF.valence - ?) as diffVa FROM acoustic_features AF ORDER BY (diffAc*diffAc + diffDa*diffDa + diffEn*diffEn + diffIn*diffIn + diffLi*diffLi + diffLo*diffLo + diffSp*diffSp + diffVa*diffVa) ASC LIMIT 20;";
  var result = null;
  db.all(sql, [acoust, dance, energy, instrum, liveness, loudness, speechiness, valence], (err, results) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(results);
    console.log(err);
    res.send({data: results});
  });
});

module.exports = app;












// db.all('CREATE TABLE Users(Username TEXT PRIMARY KEY, Password TEXT, Age INTEGER, Gender TEXT, FName TEXT, LName TEXT);', (err, results) => {
//   console.log(err);
//   db.all('INSERT INTO Users (Username, Password, Age, Gender, FName, LName) VALUES ("wdavid2", "sus", 21, "M", "Will", "David");', (err, results) => {
//     console.log(err);
//     db.all('SELECT * FROM Users;', (err, results) => {
//       console.log(err);
//       console.log(results);
//     });
//   });
// });