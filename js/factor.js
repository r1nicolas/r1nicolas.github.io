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
	}
}

/*factor.prototype.toString = function() {
	if (this.factor == null)
		return "0";
	if ()
}*/

function factorize() {
	var n = document.getElementById('number').value;
	var text = n + ": ";
	var factor = new Factor(n);
	console.log(factor);
	document.getElementById('display').innerHTML = text;
}
