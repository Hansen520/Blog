setInterval(function () {
  console.log(randomRgbColor());
}, 1000);
function randomRgbColor() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  //return "radial-gradient(rgb(255,255,255),rgb("+r+","+g+","+b+"))";
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
