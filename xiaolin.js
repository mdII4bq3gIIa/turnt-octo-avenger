var xiaolin = {
	mtable: {},
	dtable: {},

	createtable: function() {
		for (var i = 0; i < 7; i++) {
			for (var j = 0; j < 7; j++) {
				this.mtable["d" + i + "$p" + j] = "d" + Math.max(i, j);
				this.dtable["d" + i + "$p" + j] = "d" + Math.min(6, (i + j));
			}
		}
	},

	plot: function(x, y, c) {
		var id = "#" + x + "x" + y;
		if ($(id).length < 1) { return; } 
		var cl = $(id).attr("class").split(" ");
		cl = _.filter(cl, function(x) {return x.match(/^d.*$/);});
		cl.push("p" + c);
		cl = cl.join("$");
		$(id)
			.removeClass("d0")
			.removeClass("d1")
			.removeClass("d2")
			.removeClass("d3")
			.removeClass("d4")
			.removeClass("d5")
			.removeClass("d6");
		$(id).addClass(xiaolin.mtable[cl]);
	},

	fpart: function(x) {
		return Math.floor((x - Math.floor(x)) * 6);
	},

	rfpart: function(x) {
		return Math.floor((1 - (x - Math.floor(x))) * 6);
	},

	round100: function(x) {
		return Math.round(x * 100) / 100;
	},

	drawline: function(x0, y0, x1, y1) {
		var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
		var s;
		if (steep) {
			s = x0;
			x0 = y0;
			y0 = s;
			s = x1;
			x1 = y1;
			y1 = s;
		}
		if (x0 > x1) {
			s = x0;
			x0 = x1;
			x1 = s;
			s = y0;
			y0 = y1;
			y1 = s;
		}


		var dx = x1 - x0;
		var dy = y1 - y0;
		var grad = dy / dx;

		if (steep) {
			xiaolin.plot(y0, x0, 6);
			xiaolin.plot(y1, x1, 6);
		} else { 
			xiaolin.plot(x0, y0, 6);
			xiaolin.plot(x1, y1, 6);
		}

		var xend = Math.round(x0);
		var yend = y0 + grad * (xend - x0);
		var xpxl1 = xend;
		xend = Math.round(x1);
		var xpxl2 = xend;

		var intery = yend + grad;
		if (xpxl1 + 1 > xpxl2) { return; }
		for (var x = xpxl1 + 1; x < xpxl2; x++) {
			if (steep) {
				xiaolin.plot(Math.floor(intery),     x, xiaolin.rfpart(intery)); 
				xiaolin.plot(Math.floor(intery) + 1, x, xiaolin.fpart(intery)); 
			} else {
				xiaolin.plot(x, Math.floor(intery),     xiaolin.rfpart(intery)); 
				xiaolin.plot(x, Math.floor(intery) + 1, xiaolin.fpart(intery));
			}
			intery = xiaolin.round100(intery + grad);
		}
	}
};
