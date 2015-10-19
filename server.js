// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var timestamps = require('mongoose-timestamp'); //timestamps plugin for mongoose
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost/questionJS');     // connect to mongoDB database

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model =================
var QuestionSchema = mongoose.Schema({
  completed: Boolean,
  dateString: Date,
  desc: String,
  echo: Number,
  head: String,
  headLastChar: String,
  linkedDesc: String,
  new: Boolean,
  order: Number,
  trustedDesc: String,
  wholeMsg: String,
});
QuestionSchema.plugin(timestamps); //This will create two auto fields: created_at and updated_at
var Question = mongoose.model('Question', QuestionSchema);

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all questions
app.get('/api/questions', function(req, res) {

  // use mongoose to get all questions in the database
  Question.find(function(err, questions) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
    res.send(err)

    res.json(questions); // return all questions in JSON format
  });
});

// create question and send back all questions after creation
app.post('/api/questions', function(req, res) {

  // create a question, information comes from AJAX request from Angular
  //TODO: replace the fields with our special case
  Question.create({
    text : req.body.text,
    done : false
  }, function(err, question) {
    if (err)
    res.send(err);

    // get and return all the questions after you create another
    Question.find(function(err, questions) {
      if (err)
      res.send(err)
      res.json(questions);
    });
  });

});

// create question and send back all questions after creation
// TODO: replace the fields with our special case
app.patch('/api/question/:question_id', function(req, res) {

  // modify a question, information comes from AJAX request from Angular
  Question.update({
    text : req.body.text,
    done : false
  }, function(err, question) {
    if (err)
    res.send(err);

    // get and return all the questions after you create another
    Question.find(function(err, questions) {
      if (err)
      res.send(err)
      res.json(questions);
    });
  });

});

// delete a question
app.delete('/api/questions/:question_id', function(req, res) {
  Question.remove({
    _id : req.params.question_id
  }, function(err, question) {
    if (err)
    res.send(err);

    Question.find(function(err, questions) {
      if (err)
      res.send(err)
      res.json(questions);
    });
  });
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
