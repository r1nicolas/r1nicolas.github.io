var vortex = document.getElementById('vortex');
var ctx = vortex.getContext('2d');
ctx.beginPath();
ctx.arc(550, 550, 500, 0, Math.PI * 2, true);  // Cercle extérieur
ctx.stroke();
