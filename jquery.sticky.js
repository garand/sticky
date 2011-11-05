// Sticky Plugin
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz)
// Date: 11/05/2011
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen

(function($){
	$.fn.sticky = function(options) {
		var defaults = {
			topSpacing: 0,
			bottomSpacing: 0,
			className: 'is-sticky'
		};  
		var o = $.extend(defaults, options);
		return this.each(function() {
			var topSpacing = o.topSpacing,
				bottomSpacing = o.bottomSpacing,
				stickyElement = $(this),
				stickyId = stickyElement.attr('id'),
				fixed = null;
			stickyElement
				.wrapAll('<div id="' + stickyId + 'StickyWrapper"></div>')
				.css('width', stickyElement.width());
			var stickyWrapper = stickyElement.parent(),
				elementHeight = stickyElement.outerHeight();
			stickyWrapper
				.css('width', stickyElement.outerWidth())
				.css('height', elementHeight)
				.css('clear', stickyElement.css('clear'));
			$(window).scroll(function() {
				var scrollTop = $(window).scrollTop(),
					windowHeight = $(window).height(),
					documentHeight = $(document).height(),
					elementTop = stickyWrapper.offset().top;
				if (scrollTop <= elementTop - topSpacing) {
					if (fixed !== null) {
						stickyElement.css('position', '').css('top', '').removeClass(o.className);
						fixed = null;
					}
				}
				else {
					if (scrollTop + topSpacing >= elementTop) {
						var extra = (documentHeight < scrollTop + windowHeight) ? documentHeight - (scrollTop + windowHeight) : 0;
						var newTop = (documentHeight - elementHeight - bottomSpacing) - scrollTop - extra;
						if (newTop < 0) {
							stickyElement.css('position', 'fixed').css('top', newTop + topSpacing).addClass(o.className);
							fixed = false;
						} else if (!fixed) {
							stickyElement.css('position', 'fixed').css('top', topSpacing).addClass(o.className);
							fixed = true;
						}
					}
				}
			});
		});
	};
})(jQuery);