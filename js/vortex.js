var vortex = document.getElementById('vortex');
var ctx = vortex.getContext('2d');
ctx.beginPath();
ctx.arc(550, 550, 500, 0, 7, true);  // Cercle extérieur
ctx.stroke();
