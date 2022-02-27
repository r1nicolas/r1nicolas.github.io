var vortex = document.getElementById('vortex');
vortex.width = 600;
vortex.height = 600;
var ctx = vortex.getContext('2d');
ctx.beginPath();
ctx.arc(275, 275, 250, 0, Math.PI * 2, true);  // Cercle extérieur
ctx.stroke();
ctx.font = "15px sans-serif"

function norm(xA, yA, xB, yB) {
	return Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
}

function arrowHead(xA, yA, xB, yB) {
	arrowLength = 10;
	arrowWidth = 8;

	AB=norm(xA, yA, xB, yB);
	xC = xB + arrowLength * (xA - xB) / AB;
	yC = yB + arrowLength * (yA - yB) / AB;
	xD = xC + arrowWidth * ( - (yB - yA)) / AB;
	yD = yC + arrowWidth * ((xB - xA)) / AB;
	xE = xC - arrowWidth * ( - (yB - yA)) / AB;
	yE = yC - arrowWidth * ((xB - xA)) / AB;

	ctx.beginPath();
	ctx.moveTo(xD, yD);
	ctx.lineTo(xB, yB);
	ctx.lineTo(xE, yE);
	ctx.stroke();
}

function drawVortex() {
	var modulo = document.getElementById('modulo').value;
	var multiplier =  document.getElementById('multiplier').value;
	var point = new Array(i);

	if (modulo < 2 || multiplier < 0)
		return;
	ctx.clearRect(0, 0, 600, 600);
	ctx.beginPath();
	ctx.arc(275, 275, 250, 0, Math.PI * 2, true);  // Cercle extérieur
	ctx.stroke();
	point[0] = {d:0, x:275, y:25};
	ctx.fillText(0, 270, 15);
	for(var i = 1;i < modulo;i++) {
		point[i] = {d:(i * multiplier) % modulo, x:275 + 250 * Math.sin(i * 2 * Math.PI / modulo), y:275 - 250 * Math.cos(i * 2 * Math.PI / modulo)};
		ctx.fillText(i, 275 + 265 * Math.sin(i * 2 * Math.PI / modulo) - 5 * (1 + Math.floor(Math.log10(i))), 280 - 265 * Math.cos(i * 2 * Math.PI / modulo));
	}
	for(var i = 1;i < modulo;i++) {
		ctx.beginPath();
		ctx.moveTo(point[i].x, point[i].y);
		ctx.lineTo(point[point[i].d].x, point[point[i].d].y);
		ctx.stroke();
		arrowHead((point[i].x, point[i].y, point[point[i].d].x, point[point[i].d].y);
	}
}
