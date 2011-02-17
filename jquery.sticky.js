// Sticky Plugin
// =============
// Author: Anthony Garand
// Date: 2/14/2011
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen

(function($){
	$.fn.sticky = function(options) {
		var defaults = {
			topSpacing: 0,
			className: 'is-sticky'
		};  
		var options = $.extend(defaults, options);
		return this.each(function() {
			var topPadding = options.topSpacing,
			stickyElement = $(this),
			stickyElementHeight = stickyElement.outerHeight(),
			stickyElementWidth = stickyElement.outerWidth(),
			elementPosition = stickyElement.offset().top - $(window).scrollTop(),
			regPosition = stickyElement.offset().top,
			stickyId = stickyElement.attr("id");
			stickyElement.wrapAll('<div id="' + stickyId + 'StickyWrapper"></div>');
			stickyElement.parent().css("height",stickyElementHeight).css("width",stickyElementWidth);
			$(window).scroll(function(){
				elementPosition = stickyElement.offset().top - $(window).scrollTop();
				if (elementPosition <= topPadding) {
					stickyElement.css("position","fixed").css("top",topPadding).addClass(options.className);
				}
				if ($(window).scrollTop() <= regPosition - topPadding) {
					stickyElement.css("position","static").css("top",$(window).scrollTop()).removeClass(options.className);
				}
			});
		});
	};
})(jQuery);