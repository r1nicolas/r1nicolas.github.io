var vortex = document.getElementById('vortex');
vortex.width = 600;
vortex.height = 600;
var ctx = vortex.getContext('2d');
ctx.beginPath();
ctx.arc(275, 275, 250, 0, Math.PI * 2, true);  // Cercle extérieur
ctx.stroke();
ctx.font = "12px sans-serif"

function drawVortex() {
	var modulo = document.getElementById('modulo').value;
	var multiplier =  document.getElementById('multiplier').value;
	var point = new Array(i);

	if (modulo < 2 || multiplier < 0)
		return;
	point[0] = {x:275, y:25, d:0};
	ctx.clearRect(0, 0, 600, 600);
	ctx.beginPath();
	ctx.arc(275, 275, 250, 0, Math.PI * 2, true);  // Cercle extérieur
	ctx.stroke();
	ctx.strokeText(0, 270, 15);
	for(var i = 1;i < modulo;i++) {
		point[i] = {d:(i * multiplier) % modulo, x:275 + 250 * Math.sin(i * 2 * Math.PI / modulo), y:275 - 250 * Math.cos(i * 2 * Math.PI / modulo)};
	}
	for(var i = 1;i < modulo;i++) {
		ctx.beginPath();
		ctx.moveTo(point[i].x, point[i].y);
		ctx.lineTo(point[point[i].d].x, point[point[i].d].y);
		ctx.stroke();
	}
}
