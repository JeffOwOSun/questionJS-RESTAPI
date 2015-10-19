console.log(String);

var MyClass = function() {
  this.name = "haha";
};
MyClass.gender = "unknown";

var myobject = new MyClass();

console.log(myobject.name + MyClass.gender);

var MyFactory = function(dict) {
  this.attr = "you don't see me";

  var privateVar = "I'm a dick";

  var privateAccessor = function() {
    return privateVar;
  }

  var ret = {
    accessor: privateAccessor,
    privateVar: "I'm an ass"
  }

  for (var key in dict) {
    ret[key] = dict[key](1);
  }

  //return ret;
}

var myNewObj = MyFactory();
console.log(myNewObj);
// console.log(myNewObj.accessor());
// console.log(myNewObj.privateVar);
// console.log(myNewObj.name);
var myNewFact = new MyFactory();
console.log(myNewFact);
//console.log(myNewObj.attr);
console.log(myNewFact.attr);

var localVar = "hoho";
(function() {
  var localVar = "haha";
  console.log(localVar);
})();

console.log(localVar);

var hehe = new String("hehe");
console.log(hehe);
var hihi = String("hehe");
console.log(hihi);
console.log(hehe == hihi);
