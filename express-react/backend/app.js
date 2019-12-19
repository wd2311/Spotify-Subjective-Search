// INITIALIZATION

var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
const sqlite = require('sqlite3');
const db = new sqlite.Database('../../billboard-200.db', (err) => console.log(err));

// ROUTES

app.get('/albums5', function(req, res, next) {
  console.log(req.query.hey);
  var lim = 5;
  db.all('SELECT * FROM albums LIMIT ?;', [lim], (err, results) => {
    console.log(err);
    res.send(results);
  });
});

app.get('/subsim', function(req, res, next) {
  var acoust = parseFloat(req.query.acousticness);
  var dance = parseFloat(req.query.danceability);
  var energy = parseFloat(req.query.energy);
  var instrum = parseFloat(req.query.instrumentalness);
  var liveness = parseFloat(req.query.liveness);
  var loudness = parseFloat(req.query.loudness);
  var speechiness = parseFloat(req.query.speechiness);
  var valence = parseFloat(req.query.valence);
  var sql = "SELECT AF.song, abs(AF.acousticness - ?) as diffAc, abs(AF.danceability - ?) as diffDa, abs(AF.energy - ?) as diffEn, abs(AF.instrumentalness - ?) as diffIn, abs(AF.liveness - ?) as diffLi, abs(AF.loudness - ?) as diffLo, abs(AF.speechiness - ?) as diffSp, abs(AF.valence - ?) as diffVa FROM acoustic_features AF ORDER BY (diffAc*diffAc + diffDa*diffDa + diffEn*diffEn + diffIn*diffIn + diffLi*diffLi + diffLo*diffLo + diffSp*diffSp + diffVa*diffVa) ASC LIMIT 20;";
  var result = null;
  db.all(sql, [acoust, dance, energy, instrum, liveness, loudness, speechiness, valence], (err, results) => {
    // console.log(err);
    // console.log(results);
    res.setHeader('Content-Type', 'application/json');
    //res.json({data: results});
    // console.log("hey");
    // result = results;
    res.send({data: results});
  });
  // console.log(result);
  // res.send({data: result});
});

app.get('/userplaylists', function(req, res, next) {
  var username = req.query.username;
  var sql = "SELECT * FROM UserPlaylists WHERE Username = ?";
  var result = null;
  db.all(sql, [username], (err, results) => {
    // console.log(err);
    // console.log(results);
    res.setHeader('Content-Type', 'application/json');
    //res.json({data: results});
    // console.log("hey");
    // result = results;
    res.send({data: results});
  });
  // console.log(result);
  // res.send({data: result});
});
app.get('/playlistsongs', function(req, res, next) {
  var playlistid = parseInt(req.query.playlistid);
  var sql = "SELECT PS.PlaylistID FROM PlaylistSongs PS, acoustic_features AF WHERE PS.PlaylistID = ? AND PS.songID = AF.id";
  var result = null;
  db.all(sql, [playlistid], (err, results) => {
    // console.log(err);
    // console.log(results);
    res.setHeader('Content-Type', 'application/json');
    //res.json({data: results});
    // console.log("hey");
    // result = results;
    res.send({data: results});
  });
  // console.log(result);
  // res.send({data: result});
});

app.post('/userplaylistsnew', function(req, res, next) {
  var username = req.query.username;
  var playlistname = req.query.playlistname;

  var sql = "INSERT INTO UserPlaylists VALUES (?, 14, ?, 11);";
  var result = null;
  db.all(sql, [username], (err, results) => {
    // console.log(err);
    // console.log(results);
    res.setHeader('Content-Type', 'application/json');
    //res.json({data: results});
    // console.log("hey");
    // result = results;
    res.send({data: results});
  });
  // console.log(result);
  // res.send({data: result});
});

app.post('/userplaylistsnew', function(req, res, next) {
  var username = req.query.username;
  var playlistname = req.query.playlistname;

  var sql = "INSERT INTO UserPlaylists VALUES (?, 14, ?, 11);";
  var result = null;
  db.all(sql, [username], (err, results) => {
    // console.log(err);
    // console.log(results);
    res.setHeader('Content-Type', 'application/json');
    //res.json({data: results});
    // console.log("hey");
    // result = results;
    res.send({data: results});
  });
  // console.log(result);
  // res.send({data: result});
});

app.post('/userplaylistsnew', function(req, res, next) {
  var playlistid = req.query.playlistid;
  var sql = "DELETE FROM UserPlaylists WHERE playlistid = );";
  var result = null;
  db.all(sql, [username], (err, results) => {
    // console.log(err);
    // console.log(results);
    res.setHeader('Content-Type', 'application/json');
    //res.json({data: results});
    // console.log("hey");
    // result = results;
    res.send({data: results});
  });
  // console.log(result);
  // res.send({data: result});
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
