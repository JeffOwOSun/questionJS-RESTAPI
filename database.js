var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  //yay
});

var kittySchema = mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function() {
  var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({name : 'Silence'});
console.log(silence.name);

var fluffy = new Kitten({name : 'fluffy'});
fluffy.speak();

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  console.log("hear our fluffy speak: ")
  fluffy.speak();
});

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log("all kittens: "+kittens);
})

Kitten.find({name: /^fluff/ }, function (err, kitten) {
  if (err) return console.error(err);
  console.log("Fluff kitten: "+kitten);
});

console.log("last line of code!\n");
mongoose.disconnect();
