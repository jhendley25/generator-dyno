exports.welcome = function(){
  var inputs = ["d","y","n","o"]
  var result = inputs.map(word => word.split("")[0] ).reduce( (a,b) => a+b );
  // because everyone loves over-engineering
  console.log(result)
}