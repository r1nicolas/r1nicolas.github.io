var vortex = document.getElementById('vortex');
var ctx = vortex.getContext('2d');
ctx.beginPath();
ctx.arc(275, 275, 250, 0, MATH.PI * 2, true);  // Cercle extérieur
ctx.stroke();
