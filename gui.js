var Gui = {
	height: 40,
	width: 80,

	start: {x: 0, y: 0},
	on: false,

	mode: "line",
	modes: {
		box: "drawBox",
		line: "drawLine",
		multiline: "drawMultiLine"
	},

	grid: function() {
		var col, tally, cell, dark, i = 0;
		for (i = 0; i < this.width + 1; i++) {
			col = $("<div/>").addClass("grid");
			var c = $("<ul/>").addClass("grid");
			tally = 0;
			for (j = 0; j < this.height + 1; j++) {
				cell = ich.cell();
				var ccc = $(cell).attr("id", i + "x" + tally).addClass("d0");
				if (!(i % 5 || j % 5)) {
					ccc.addClass("g1");
				}
				ccc.appendTo(c);

				tally++;
			}
			col.append(c);
			$('body').append(col);
		}
	},

	message: function(m) {
		$("#message").html(m);
	},

	interactive: function() {
		var d = $("<div/>")
		d.append('<div id="line" class="command"><h3>Line</h3></div>');
		d.append('<div id="mline" class="command"><h3>Multi Line</h3></div>');
		d.append('<div id="box" class="command"><h3>Box</h3></div>');
		d.append('<div id="clear" class="command"><h3>Clear</h3></div>');
		d.append('<div id="grid" class="command"><h3>Show Grid</h3></div>');
		d.append('<div id="size" class="command"><h3>Small Grid</h3></div>');
		$("body").append(d);
		$("body").append('<div id="status"><span id="message"/></div>');
		$("div.grid").on("mouseover", "li", function() {
			$(this).addClass("h1");
		});
		$("div.grid").on("mouseout", "li", function() {
			$(this).removeClass("h1");
		});
		$("div.grid").on("click", "li.cell", function() {
			var point = $(this).attr("id").split("x");
			point[0] = parseInt(point[0]);
			point[1] = parseInt(point[1]);
			Gui.modeActions(point);
		});
		$("#line").on("click", function() {
			Gui.reset();
			Gui.mode = "line";
			Gui.message("Line mode");
		});
		$("#mline").on("click", function() {
			Gui.reset();
			Gui.mode = "multiline";
			Gui.message("Multi line mode");
		});
		$("#box").on("click", function() {
			Gui.reset();
			Gui.mode = "box";
			Gui.message("box mode");
		});
		$("#grid").on("click", function() {
			if ($("body").hasClass("grid")) {
				$("body").removeClass("grid");
			} else {
				$("body").addClass("grid");
			}
		});
		$("#size").on("click", function() {
			if ($("body").hasClass("small")) {
				$("body").removeClass("small");
			} else {
				$("body").addClass("small");
			}
		});
		$("#clear").on("click", Gui.clear);
	},


	/*
	darken: function() {
		$("div.grid").on("click", "li.d0", function() {
			$(this).removeClass("d0").addClass("d1");
		});
		$("div.grid").on("click", "li.d1", function() {
			$(this).removeClass("d1").addClass("d2");
		});
		$("div.grid").on("click", "li.d2", function() {
			$(this).removeClass("d2").addClass("d3");
		});
		$("div.grid").on("click", "li.d3", function() {
			$(this).removeClass("d3").addClass("d4");
		});
		$("div.grid").on("click", "li.d4", function() {
			$(this).removeClass("d4").addClass("d5");
		});
		$("div.grid").on("click", "li.d5", function() {
			$(this).removeClass("d5").addClass("d6");
		});
		$("div.grid").on("click", "li.d6", function() {
			$(this).removeClass("d6").addClass("d0");
		});
	),
	*/

	modeActions: function(point) {
		if (!this.modes[this.mode]) {
			return;
		}

		Gui[this.modes[this.mode]](point);
	},

	clear: function() {
		Gui.whitecell(".cell");
		Gui.reset();
	},

	whitecell: function(sel) {
		$(sel)
			.removeClass("d1")
			.removeClass("d2")
			.removeClass("d3")
			.removeClass("d4")
			.removeClass("d5")
			.removeClass("d6")
			.addClass("d0");
	},

	paintBox: function(point, d) {
		var s, i, j;
		if (this.start[0] > point[0]) {
			s = this.start[0];
			this.start[0] = point[0];
			point[0] = s;
		}
		if (this.start[1] > point[1]) {
			s = this.start[1];
			this.start[1] = point[1];
			point[1] = s;
		}
		for (i = this.start[0]; i < point[0] + 1; i++) {
			for (j = this.start[1]; j < point[1] + 1; j++) {
				this.whitecell("#" + i + "x" + j);
				$("#" + i + "x" + j)
					.removeClass("d0")
					.addClass(d);
			}
		}
	},

	drawBox: function(point) {
		if (this.on) {
			this.paintBox(point, "d3");
			this.on = false;
		} else {
			this.store(point);
		}
	},

	drawLine: function(point) {
		if (this.on) {
			this.lineTo(point);
			this.on = false;
		} else {
			this.store(point);
		}
	},

	drawMultiLine: function(point) {
		this.drawLine(point);
		this.store(point);
	},

	reset: function() {
		this.on = false;
	},

	store: function(p) {
		this.start = p;
		this.on = true;
	},

	lineTo: function(p) {
		xiaolin.drawline(
			this.start[0],
			this.start[1],
			p[0],
			p[1]
		);
	}
};
