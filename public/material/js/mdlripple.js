(function ($) {
	"use strict";

	var rippleFunc = function () {
		var o = this; // Create reference to this instance
		$(document).ready(function () {
			o.initialize();
		}); // Initialize app when document is ready

	};

	var p = rippleFunc.prototype;

	p.initialize = function () {

		// Init components
		this._initInk();


	};

	p._initInk = function () {
		var o = this;

		$('.mdl-zoor-ripple').on('click', function (e) {
			var bound = $(this).get(0).getBoundingClientRect();
			var x = e.clientX - bound.left;
			var y = e.clientY - bound.top;

			var color = o.getBackground($(this));
			var inverse = (o.getLuma(color) > 183) ? ' inverse' : '';

			var ink = $('<div class="ink' + inverse + '"></div>');
			var btnOffset = $(this).offset();
			var xPos = e.pageX - btnOffset.left;
			var yPos = e.pageY - btnOffset.top;

			ink.css({
				top: yPos,
				left: xPos
			}).appendTo($(this));

			window.setTimeout(function () {
				ink.remove();
			}, 1500);
		});
	};

	p.getBackground = function (item) {
		// Is current element's background color set?
		var color = item.css("background-color");
		var alpha = parseFloat(color.split(',')[3], 10);

		if ((isNaN(alpha) || alpha > 0.8) && color !== 'transparent') {
			// if so then return that color if it isn't transparent
			return color;
		}

		// if not: are you at the body element?
		if (item.is("body")) {
			// return known 'false' value
			return false;
		} else {
			// call getBackground with parent item
			return this.getBackground(item.parent());
		}
	};

	p.getLuma = function (color) {
		var rgba = color.substring(4, color.length - 1).split(',');
		var r = rgba[0];
		var g = rgba[1];
		var b = rgba[2];
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		return luma;
	};

	window.mdlzoor = window.mdlzoor || {};
	window.mdlzoor.rippleFunc = new rippleFunc;
}(jQuery)); // pass in (jQuery):
