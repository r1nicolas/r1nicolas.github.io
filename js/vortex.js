var vortex = document.getElementById('vortex');
vortex.width = 600;
vortex.height = 600;
var ctx = vortex.getContext('2d');
ctx.beginPath();
ctx.arc(275, 275, 250, 0, Math.PI * 2, true);  // Cercle extérieur
ctx.stroke();
