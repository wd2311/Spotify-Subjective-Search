// INITIALIZATION

var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
const sqlite = require('sqlite3');
const db = new sqlite.Database('../../billboard-200.db', (err) => {});

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
  var tempo = parseFloat(req.query.tempo);
  var key = parseInt(req.query.key);
  var sql = "SELECT AF.id, AF.song, AF.artist, AF.date, AF.duration_ms, abs(AF.acousticness - ?) as diffAc, abs(AF.danceability - ?) as diffDa, abs(AF.energy - ?) as diffEn, abs(AF.instrumentalness - ?) as diffIn, abs(AF.liveness - ?) as diffLi, abs(AF.loudness/60.0 - ?/60.0) as diffLo, abs(AF.speechiness - ?) as diffSp, abs(AF.valence - ?) as diffVa FROM acoustic_features AF WHERE AF.tempo > ? AND AF.key = ? ORDER BY (diffAc*diffAc + diffDa*diffDa + diffEn*diffEn + diffIn*diffIn + diffLi*diffLi + diffLo*diffLo + diffSp*diffSp + diffVa*diffVa) ASC LIMIT 20;";
  var result = null;
  db.all(sql, [acoust, dance, energy, instrum, liveness, loudness, speechiness, valence, tempo, key], (err, results) => {
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

app.get('/login', function(req, res, next) {
  var username = req.query.user;
  var password = req.query.pass;
  // console.log(username);
  // console.log(password);
  var sql = "SELECT * FROM Users WHERE Username = ? AND Password = ?;"
  db.all(sql, [username, password], (err, results) => {
    res.setHeader('Content-Type', 'application/json');
    // console.log(results);
    if (results.length > 0) {
      res.send({data: "success"});
    } else {
      res.send({data: "failure"});
    }
  });
});

app.get('/signup', function(req, res, next) {
  var username = req.query.user;
  var password = req.query.pass;
  var sql = "SELECT * FROM Users WHERE Username = ?;";
  res.setHeader('Content-Type', 'application/json');
  db.all(sql, [username], (err, results) => {
    var len = parseFloat(results.length);
    console.log(len);
    if (len > 0.99) {
      res.send({data: "failure"});
    } else {
      db.all('INSERT INTO Users (Username, Password, Age, Gender, FName, LName) VALUES ("' + username + '", "' + password + '", 0, "N/A", "N/A", "N/A");', (err, results) => {
        console.log(err);
      });
      res.send({data: "success"});
    }
  });
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
  var sql = "SELECT PS.PlaylistID, AF.song, AF.Artist, AF.id FROM PlaylistSongs PS, acoustic_features AF WHERE PS.PlaylistID = ? AND PS.songID = AF.id";
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
  var description = req.query.description;
  var sql = "INSERT INTO UserPlaylists VALUES (?, null, ?, ? );";
  var result = null;
  db.all(sql, [username, playlistname, description], (err, results) => {
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

app.post('/userplaylistsdelete', function(req, res, next) {
  var playlistid = req.query.playlistid;
  var sql = "DELETE FROM UserPlaylists WHERE playlistid = ?;";
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

app.post('/addplaylistsong', function(req, res, next) {
  var playlistid = parseInt(req.query.playlistid);
  var songid = req.query.songid;
  var sql = "INSERT INTO PlaylistSongs VALUES (?, ?);";
  var result = null;
  db.all(sql, [playlistid, songid], (err, results) => {
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

app.post('/removeplaylistsong', function(req, res, next) {
  var playlistid = req.query.playlistid;
  var songid = req.query.songid;
  var sql = "DELETE FROM PlaylistSongs WHERE playlistid = ? AND songid = ?;";
  var result = null;
  db.all(sql, [playlistid, songid], (err, results) => {
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
