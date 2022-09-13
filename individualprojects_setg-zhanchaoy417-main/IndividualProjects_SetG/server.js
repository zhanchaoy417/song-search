// Load the modules
var express = require('express'); //Express - a web application framework that provides useful utility functions like 'http'
var app = express();
var bodyParser = require('body-parser'); // Body-parser -- a library that provides functions for parsing incoming requests
app.use(bodyParser.json());              // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
const axios = require('axios');
const qs = require('query-string');

//
var pgp = require('pg-promise')();
const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'football_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);
// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));// Set the relative path; makes accessing the resource directory easier


// Home page
app.get('/', function(req, res) {
  res.render('pages/main', {
    my_title: "Song search",
    items: '',
    error: false,
    message: ''
  });
});
//review page 
//fetch data from database

  app.get('/reviews',function(req, res){
    var q1 = 'select * from songReview';
    db.task('get-everything', task => {
      return task.batch([
        task.any(q1),
     
      ]);
    })
    .then(data =>{
      res.render('pages/reviews',{
          my_title: "song_reviews",
          songName: data[0].song,
          review: data[0].review,
          review_date: data[0].review_date
        })
    })
    .catch(err => {
      // display error message in case an error
        console.log('error', err);
        res.render('pages/reviews',{
          my_title: "song_reviews",
          result_1: ''
        })
    }) ;
  });
 
  app.post('pages/reviews',function(req, res){
    var select_option= 'select * from songReview;';
    var name=req.body.name;
    var review=req.body.review;
    var review_date=review_date;
    //a filtter function and limit the review to 3
    var filtter='select * from songReview limit 3;'
    var insert= 'INSERT INTO songReview(name, review, review_date) VALUES(\''+name+'\', \''+review+'\',\''+review_date+'\');';
    db.task('get-everything', task => {
      return task.batch([
        task.any(insert),
        task.any(select_option),
        task.any(filtter)
      ]);
    })
    .then(data => {
      res.render('pages/reviews',{
        my_title: "song_reviews",
        songName: data[0].song,
        review: data[0].review,
        review_date: data[0].review_date
      })
    })
    .catch(err => {
      // display error message in case an error
        console.log('error', err);
        res.render('pages/reviews',{
          my_title: "song_reviews",
          result_1: '',
          result_2: '',
          result_3: ''
        })
    }) ;
  });


//to request data from API
app.post('/get_feed', function(req, res) {
  var title = req.body.title; 
 console.log(title)
  if(title) {
    axios({
      url: `https://itunes.apple.com/search?term=${title}`,
        method: 'GET',
        dataType:'json',
      })
        .then(items => {
          console.log(items.data.results)
          res.render('pages/main',{
            my_title: "NYTimes Movie Reviews",
            items: items.data.results,
            error: false,
            message: ''
          })
        })
        .catch(error => {
          console.log(error);
          res.render('pages/main',{
            my_title: "NYTimes Movie Reviews",
            items: '',
            error: true,
            message: error
          })
        });


  }
  else {
    res.render('pages/main',{
      my_title: "Song Reviews",
      items: '',
      error: true,
      message: 'no title given'
    })
  }
});


app.listen(3000);
console.log('3000 is the magic port');