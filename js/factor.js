function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

/*
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function hslToRgb(h) {
	var r, g, b;

	var hue2rgb = function hue2rgb(t) {
		if(t < 0) t += 1;
		if(t > 1) t -= 1;
		if(t < 1/6) return 6 * t;
		if(t < 1/2) return 1;
		if(t < 2/3) return 4 - 6 * t;
		return 0;
	}

	r = hue2rgb(h + 1/3);
	g = hue2rgb(h);
	b = hue2rgb(h - 1/3);
	
	r = Math.round(r * 255);
	g = Math.round(g * 255);
	b = Math.round(b * 255);
	
	return "rgb( " + r + ", " + g + ", " + b + ")";
}

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

function Factor(number) {
	number = number.toString();
	if (number.includes(",")) {
		this.factor = number.split(",");
		if (this.factor[0] == -1) {
			this.neg = true;
			this.factor.shift();
		}
		else
			this.neg = false;
		return ;
	}
	this.neg = false;
	if (number == 0)
		this.factor = null;
	else {
		this.factor = [];
		if (number < 0) {
			this.neg = true;
			number = -number;
		}
		var i = 2;
		while (i * i <= number) {
			while (number % i == 0) {
				this.factor.push(i);
				number /= i;
			}
			i++;
		}
		if (number > 1)
			this.factor.push(number);
		if (rev)
			this.factor.reverse();
	}
}

Factor.prototype.getFactor = function() {
	if (this.factor == null)
		return ("0");
	if (this.factor.length == 0 && !this.neg)
		return ("1");
	if (this.factor.length == 0)
		return ("-1");
	var ret = "";
	if (this.neg)
		ret = "-";
	for(var i = 0;i < this.factor.length - 1;i++) {
		ret += this.factor[i] + "&times;";
	}
	ret += this.factor[i];
	return (ret);
}

Factor.prototype.getButton = function() {
	if (this.factor == null || (this.factor.length == 0 && !this.neg))
		return "";
	var ret = "";
	if (this.neg)
		ret += '<input type="submit" value="&div;-1" onclick="div(-1)" />';
	var unique = this.factor.filter(onlyUnique);
	for(var i = 0;i < unique.length;i++) {
		ret += '<input type="submit" value="&div;' + unique[i] + '" onclick="div(' + unique[i] + ')" />';
	}
	return (ret);
}

Factor.prototype.getDiv = function() {
	var div = '<div class="round"></div>';
	var ret = '';
	if (this.factor === null || this.neg)
		return ("<br>");
	else if (this.factor.length == 0)
		return ('<span style="top: 5px; left: 5px;">' + div + '</span>');
	else {
		var radius = 5;
		var tmp = div;
		var finalRadius = 5;
		for(var i = 0;i < this.factor.length;i++) {
			var number = this.factor[i];
			if (this.factor[i] == 2 && (i + 1) < this.factor.length && this.factor[i + 1] == 2) {
				number = 4;
				i++;
			}
			ret = "";
			radius = (2 * finalRadius + 5) / (2 * Math.sin(Math.PI / number));
			finalRadius += radius;
			var angle = 360 / number;
			for(var j = 0;j < number;j++) {
				ret += '<div style="transform:rotate(' + (j * angle) + 'deg) translateY(-' + radius + 'px)">' + tmp + '</div>';
			}
			if (number == 4 && ((i + 2) > this.factor.length || this.factor[i + 1] != 2 || this.factor[i + 2] != 2))
				ret = '<div style="transform:rotate(45deg)">' + ret + '</div>';
			tmp = ret;
		}
		return '<span style="top: ' + finalRadius + 'px; left: ' + finalRadius + 'px;">' + ret + '</span>';
	}
}

Factor.prototype.reverse = function() {
	this.factor.reverse()
}

Factor.prototype.shuffle = function() {
	shuffleArray(this.factor);
}

Factor.prototype.link = function() {
	if (this.factor == null)
		return ("0");
	if (this.factor.length == 0 && this.neg)
		return ("-1");
	if (this.factor.length == 0)
		return ("1");
	ret = "";
	if (this.neg)
		ret += "-1,";
	ret = this.factor.reduce(function(a, b) { return (a.toString() + "," + b.toString()); }, "ret");
}

n = 0;
rev = 0;
factor = null;

function draw() {
	var text = n + ": ";
	text += factor.getFactor() + "<br />";
	text += '<a href="https://r1nicolas.github.io/?number=' + factor.link() + '">direct link</a><br />';
	text += factor.getButton() + "<br /><br />";
	text += factor.getDiv();
	document.getElementById('display').innerHTML = text;
	var round = document.getElementsByClassName("round");
	var l = round.length;
	for (i = 0;i < l;i++) {
		round[i].style.background = hslToRgb(i / l);
	}
	document.title = "Factorize " + n;
}

function reverse() {
	rev = (rev + 1) % 2;
	factor.reverse();
	draw();
}

function shuffle() {
	factor.shuffle();
	draw();
}

if (input = $_GET('number')) {
	if (input.includes(",")) {
		n = input.split(",");
		n = n.reduce(function(a,b) { return (a * b); } );
	}
	else
		n = input;
	factor = new Factor(input);
	draw();
	var hidden = document.getElementsByClassName('hidden');
	for(var i = 0;i < hidden.length;i++) {
		hidden[i].style.visibility = "visible";
	}
}

function set() {
	n = document.getElementById('number').value;
	factor = new Factor(n);
	draw();
	var hidden = document.getElementsByClassName('hidden');
	for(var i = 0;i < hidden.length;i++) {
		hidden[i].style.visibility = "visible";
	}
}

function add() {
	n = parseInt(n) + parseInt(document.getElementById('number').value);
	factor = new Factor(n);
	draw();
}

function sub() {
	n -= document.getElementById('number').value;
	factor = new Factor(n);
	draw();
}

function mult() {
	n *= document.getElementById('number').value;
	factor = new Factor(n);
	draw();
}

function div(number) {
	n /= number;
	factor = new Factor(n);
	draw();
}

function addOne() {
	n = parseInt(n) + 1;
	factor = new Factor(n);
	draw();
}

function subOne() {
	n -= 1;
	factor = new Factor(n);
	draw();
}

var int;

function backward() {
	window.clearInterval(int);
	int = setInterval(subOne, 1000);
}

function stop() {
	window.clearInterval(int);
}

function forward() {
	window.clearInterval(int);
	int = setInterval(addOne, 1000);
}
