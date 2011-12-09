// Sticky Plugin
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz)
// Date: 9/12/2011
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
				currentTop = null;
			stickyElement
				.wrapAll('<div id="' + stickyId + 'StickyWrapper"></div>')
				.css('width', stickyElement.width());
			var stickyWrapper = stickyElement.parent(),
				elementHeight = stickyElement.outerHeight();
			stickyWrapper
				.css('width', stickyElement.outerWidth())
				.css('height', elementHeight)
				.css('clear', stickyElement.css('clear'));
			var windowHeight = $(window).height();
			$(window).resize(function() {
				windowHeight = $(window).height();
			});
			$(window).scroll(function() {
				var scrollTop = $(window).scrollTop(),
					documentHeight = $(document).height(),
					elementTop = stickyWrapper.offset().top,
					dwh = documentHeight - windowHeight;
				var extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
				var etse = elementTop - topSpacing - extra;
				if (scrollTop <= etse) {
					if (currentTop !== null) {
						stickyElement.css('position', '').css('top', '').removeClass(o.className);
						currentTop = null;
					}
				}
				else {
					var newTop = documentHeight - elementHeight - topSpacing - bottomSpacing - scrollTop - extra;
					if (newTop < 0) {
						newTop = newTop + topSpacing;
					} else {
						newTop = topSpacing;
					}
					if (currentTop != newTop) {
						stickyElement.css('position', 'fixed').css('top', newTop).addClass(o.className);
						currentTop = newTop;
					}
				}
			});
		});
	};
})(jQuery);