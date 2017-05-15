function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function hslToRgb(h) {
	var r, g, b;

	var hue2rgb = function hue2rgb(t) {
		if(t < 0) t += 1;
		if(t > 1) t -= 1;
		if(t < 1/6) return 6 * t;
		if(t < 1/2) return 1;
		if(t < 2/3) return 4 - 6 * t;
		return p;
	}

	r = hue2rgb(h + 1/3);
	g = hue2rgb(h);
	b = hue2rgb(h - 1/3);
	
	r = Math.round(r * 255);
	g = Math.round(g * 255);
	b = Math.round(b * 255);
	
	return "rgb( " + r + ", " + g + ", " + b + ")";
}

function Factor(number) {
	if (number == 0)
		this.factor = null;
	else if (number == 1)
		this.factor = [];
	else {
		this.factor = [];
		if (number < 0) {
			this.factor[0] = -1;
			number = -number;
		}
		var i = 2;
		while (i * i <= number) {
			while (number % i == 0) {
				this.factor[this.factor.length] = i;
				number /= i;
			}
			i++;
		}
		if (number > 1)
			this.factor[this.factor.length] = number;
	}
}

Factor.prototype.getFactor = function() {
	if (this.factor == null)
		return ("0");
	if (this.factor.length == 0)
		return ("1");
	if (this.factor.length == 1 && this.factor[0] == -1)
		return ("-1");
	var ret;
	var i;
	if (this.factor[0] == -1) {
		ret = "-";
		i = 1;
	}
	else  {
		ret = "";
		i = 0;
	}
	for(;i < this.factor.length - 1;i++) {
		ret += this.factor[i] + "&times;";
	}
	ret += this.factor[i];
	return (ret);
}

Factor.prototype.getButton = function() {
	if (this.factor == null || this.factor.length == 0)
		return "";
	if (this.factor.length == 1 && this.factor[0] == -1)
		return "-1";
	var ret = "";
	var unique = this.factor.filter( onlyUnique );
	for(var i = 0;i < unique.length;i++) {
		ret += '<input type="submit" value="&div;' + unique[i] + '" onclick="div(' + unique[i] + ')" />';
	}
	return (ret);
}

Factor.prototype.getDiv = function() {
	var div = '<div class="round"></div>';
	var ret = '';
	if (this.factor === null)
		return ("<br>");
	else if (this.factor.length == 0)
		return ('<span style="top: 5px; left: 5px;">' + div + '</span>');
	else if (this.factor[0] == -1)
		return ("<br>");
	else {
		var radius = 5;
		var tmp = div;
		var finalRadius = 5;
		for(var i = 0;i < this.factor.length;i++) {
			ret = "";
			if (this.factor[i] != 2)
				radius = (2 * finalRadius + 5) / (2 * Math.sin(Math.PI / this.factor[i]));
			else if (i == 0)
				radius = 7.5;
			else if (i % 2 == 0)
				radius = 2 * radius + 5;
			finalRadius += radius;
			if (this.factor[i] == 2 && (i + 1) < this.factor.length && this.factor[i + 1] == 2) {
				ret += '<div style="transform:rotate(90deg) translateY(-' + radius + 'px">' + tmp + '</div>';
				ret += '<div style="transform:rotate(270deg) translateY(-' + radius + 'px">' + tmp + '</div>';
			}
			else {
				var angle = 360 / this.factor[i];
				for(var j = 0;j < this.factor[i];j++) {
					ret += '<div style="transform:rotate(' + (j * angle) + 'deg) translateY(-' + radius + 'px)">' + tmp + '</div>';
				}
			}
			tmp = ret;
		}
		return '<span style="top: ' + finalRadius + 'px; left: ' + finalRadius + 'px;">' + ret + '</span>';
	}
}

n = 0;

function factorize() {
	var text = n + ": ";
	var factor = new Factor(n);
	console.log(factor);
	text += factor.getFactor() + "<br />";
	text += factor.getButton() + "<br />";
	text += factor.getDiv();
	document.getElementById('display').innerHTML = text;
	var round = document.getElementsByClassName("round");
	for (i = 0;i < round.length;i++) {
		round[i].style.background = hslToRgb(i / round.length);
	}
	document.title = "Factorize " + n;
}

function set() {
	n = document.getElementById('number').value;
	factorize();
	var hidden = document.getElementsByClassName('hidden');
	for(var i = 0;i < hidden.length;i++) {
		hidden[i].style.visibility = "visible";
	}
}

function add() {
	n = parseInt(n) + parseInt(document.getElementById('number').value);
	factorize();
}

function sub() {
	n -= document.getElementById('number').value;
	factorize();
}

function mult() {
	n *= document.getElementById('number').value;
	factorize();
}

function div(number) {
	n /= number;
	factorize();
}

function addOne() {
	n = parseInt(n) + 1;
	factorize();
}

function subOne() {
	n -= 1;
	factorize();
}
