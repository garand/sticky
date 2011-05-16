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
		var o = $.extend(defaults, options);
		return this.each(function() {
			var topSpacing = o.topSpacing,
			stickyElement = $(this),
			regPosition = stickyElement.offset().top,
			stickyId = stickyElement.attr('id'),
			fixed = false;
			stickyElement.wrapAll('<div id="' + stickyId + 'StickyWrapper"></div>');
			stickyElement
				.css('width', stickyElement.width())
				.parent()
					.css('width', stickyElement.outerWidth())
					.css('height', stickyElement.outerHeight())
					.css('clear', stickyElement.css('clear'));
			$(window).scroll(function() {
				var scrollTop = $(window).scrollTop();
				if (scrollTop <= regPosition - topSpacing) {
					if (fixed) {
						stickyElement.css('position', '').css('top', '').removeClass(o.className);
						fixed = false;
					}
				}
				else if (!fixed) {
					var elementPosition = stickyElement.offset().top - scrollTop;
					if (elementPosition <= topSpacing) {
						stickyElement.css('position', 'fixed').css('top', topSpacing).addClass(o.className);
						fixed = true;
					}
				}
			});
		});
	};
})(jQuery);