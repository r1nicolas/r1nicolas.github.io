function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
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
		while (i <= number) {
			while (number % i == 0) {
				this.factor[this.factor.length] = i;
				number /= i;
			}
			i++;
		}
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

n = 0;

function factorize() {
	var text = n + ": ";
	var factor = new Factor(n);
	console.log(factor);
	text += factor.getFactor() + "<br />";
	text += factor.getButton();
	document.getElementById('display').innerHTML = text;
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

/*	public function toImg() {
		$img = "<div class='round'></div>";
		$ret = "";
		if ($this->array === null)
			return "<br>";
		else if ($this->array === array())
			return "<span style='top: 5px; left: 5px;'>".$img."</span>";
		else if ($this->array[0] == -1)
			return "<br>";
		else {
			$radius = 5;
			$tmp = $img;
			$finalRadius = 5;
			foreach ($this->array as $i => $number) {
				$ret = "";
				if ($number != 2)
					$radius = (2 * $finalRadius + 5) / (2 * sin(pi() / $number));
				else if ($i == 0)
					$radius = 7.5;
				else if ($i % 2 != 1)
					$radius = 2 * $radius + 5;
				$finalRadius += $radius;
				if ($number == 2 && isset($this->array[$i + 1]) && $this->array[$i + 1] == 2) {
					$ret .= "<div style='transform: rotate(90deg) translateY(-".$radius."px)'>".$tmp."</div>";
					$ret .= "<div style='transform: rotate(270deg) translateY(-".$radius."px)'>".$tmp."</div>";
				}
				else {
					for ($j = 0;$j < $number;$j++) {
						$angle = $j * 360 / $number;
						$ret .= "<div style='transform: rotate(".$angle."deg) translateY(-".$radius."px)'>".$tmp."</div>";
					}
				}
				$tmp = $ret;
			}
			return "<span style='top: ".($finalRadius)."px; left: ".($finalRadius)."px;'>".$ret."</span>";
		} 
	}*/
/*
