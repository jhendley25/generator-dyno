exports.welcome = function(){
  let inputs = ["d","y","n","o"]
  let result = inputs.map(word => word.split("")[0] ).reduce( (a,b) => a+b );
  // because everyone loves over-engineering
  console.log(result)
}