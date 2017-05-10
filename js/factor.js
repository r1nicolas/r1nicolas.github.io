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
		while (i <= number) {
			while (number % i == 0) {
				this.factor[this.factor.length] = i;
				number /= i;
			}
			i++;
		}
	}
}

Factor.prototype.toString = function() {
	if (this.factor == null)
		return "0";
	if (this.factor.length == 0)
		return "1";
	if (this.factor.length == 1 && this.factor[0] == -1)
		return "-1";
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

n = 0;
function factorize() {
	n = document.getElementById('number').value;
	var text = n + ": ";
	var factor = new Factor(n);
	console.log(factor);
	text += factor.toString();
	document.getElementById('display').innerHTML = text;
	document.title = "Factorize " + n
	getElementsByClass('hidden').style.visibility = "visible";
}
