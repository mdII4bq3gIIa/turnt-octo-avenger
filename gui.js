var Gui = {
	start: {x: 0, y: 0},
	on: false,

	grid: function() {
		var col, tally, cell, dark, i = 0;
		for (i = 0; i < 80; i++) {
			col = $("<div/>").addClass("grid");
			var c = $("<ul/>").addClass("grid");
			tally = 0;
			for (j = 0; j < 40; j++) {
				cell = ich.cell();
				if (!(i % 5 || j %5)) {
						dark = "d1";
				} else {
						dark = "d0";
				}
				$(cell).attr("id", i + "x" + tally).addClass(dark).appendTo(c);

				tally++;
			}
			col.append(c);
			$('body').append(col);
		}
	},

	interactive: function() {
		$("div.grid").on("mouseover", "li", function() {
			$(this).addClass("h1");
			});
		$("div.grid").on("mouseout", "li", function() {
			$(this).removeClass("h1");
		});
		/*
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
		*/
		$("div.grid").on("click", "li.cell", function() {
			var point = $(this).attr("id").split("x");
			if (Gui.on) {
				Gui.lineTo(point);
			} else {
				Gui.store(point);
			}
		});
	},

	store: function(p) {
		this.start = p;
		this.on = true;
	},

	lineTo: function(p) {
		xiaolin.drawline(
			parseInt(this.start[0]),
			parseInt(this.start[1]),
			parseInt(p[0]),
			parseInt(p[1])
		);
		this.on = false;

	}
};
