var colours = [
  ['#FC354C', '#6E48AA'],
  ['#FDFC47', '#24FE41']
];

function hex2rgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return 'rgb(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ')';
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) { return ("0" + parseInt(x).toString(16)).slice(-2); }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function rgbArray(rgb) {
  return rgb.split('(')[1].split(')')[0].split(',');
}

function transitionColour(from, to, width, x) {
  var m = x / width;
  var r = Math.ceil(from[0] * m + to[0] * (1 - m));
  var g = Math.ceil(from[1] * m + to[1] * (1 - m));
  var b = Math.ceil(from[2] * m + to[2] * (1 - m));
  return rgb2hex('rgb(' + r + ', ' + g + ', ' + b + ')');
}

document.addEventListener("mousemove", function(e) {
  var xPos = e.pageX;
  var width = window.innerWidth;

  var topLeft     = hex2rgb(colours[0][0]);
  var topRight    = hex2rgb(colours[1][0]);
  var bottomLeft  = hex2rgb(colours[0][1]);
  var bottomRight = hex2rgb(colours[1][1]);

  var topTransition    = transitionColour(rgbArray(topRight), rgbArray(topLeft), width, xPos);
  var bottomTransition = transitionColour(rgbArray(bottomRight), rgbArray(bottomLeft), width, xPos);

  document.body.style.background = 'linear-gradient(' + topTransition + ', ' + bottomTransition + ')';
});