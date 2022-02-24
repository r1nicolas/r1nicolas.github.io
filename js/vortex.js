var vortex = document.getElementById('vortex');
vortex.width = 600;
vortex.height = 600;
var ctx = vortex.getContext('2d');
ctx.beginPath();
ctx.arc(275, 275, 250, 0, Math.PI * 2, true);  // Cercle extérieur
ctx.stroke();

function drawVortex() {
	var modulo = document.getElementById('modulo').value;
	var multiplier =  document.getElementById('multiplier').value;
	var point[i];

	if (modulo < 2 || multiplier < 0)
		return;
	point[0].x = 275;
	point[0].y = 25;
	point[0].d = 0;
	for(var i = 1;i < modulo;i++) {
		point[i].d = (i * multiplier) % modulo;
		point[i].x = 275 + 250 * Math.sin(i * 2 * Math.PI / modulo)
		point[i].y = 275 - 250 * Math.cos(i * 2 * Math.PI / modulo)
	}
	for(var i = 1;i < modulo;i++) {
		ctx.beginPath();
		ctx.moveTo(point[i].x, point[i].y);
		ctx.lineTo(point[point[i].d].x, point[point[i].d].y);
		ctx.stroke();
	}
}
