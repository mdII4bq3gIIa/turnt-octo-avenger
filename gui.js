var Gui = {
	start: {x: 0, y: 0},
	on: false,

	mode: "line",
	modes: {
		line: "drawLine",
		multiline: "drawMultiLine"
	},

	grid: function() {
		var col, tally, cell, dark, i = 0;
		for (i = 0; i < 81; i++) {
			col = $("<div/>").addClass("grid");
			var c = $("<ul/>").addClass("grid");
			tally = 0;
			for (j = 0; j < 41; j++) {
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
		d.append('<div id="clear" class="command"><h3>Clear</h3></div>');
		d.append('<div id="grid" class="command"><h3>Show Grid</h3></div>');
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
		$("#grid").on("click", function() {
			if ($("body").hasClass("grid")) {
				$("body").removeClass("grid");
			} else {
				$("body").addClass("grid");
			}
		});
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
