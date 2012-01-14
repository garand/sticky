// Sticky Plugin
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Created: 2/14/2011
// Date: 9/12/2011
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll

(function($) {
    var defaults = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: 'is-sticky',
            center: false
        },
        $window = $(window),
        $document = $(document),
        sticked = [],
        windowHeight = $window.height(),
        scroller = function() {
            var scrollTop = $window.scrollTop(),
                documentHeight = $document.height(),
                dwh = documentHeight - windowHeight,
                extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
            for (var i = 0; i < sticked.length; i++) {
                var s = sticked[i],
                    elementTop = s.stickyWrapper.offset().top,
                    etse = elementTop - s.topSpacing - extra;
                if (scrollTop <= etse) {
                    if (s.currentTop !== null) {
                        s.stickyElement.css('position', '').css('top', '').removeClass(s.className);
                        s.currentTop = null;
                    }
                }
                else {
                    var newTop = documentHeight - s.elementHeight - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                    if (newTop < 0) {
                        newTop = newTop + s.topSpacing;
                    } else {
                        newTop = s.topSpacing;
                    }
                    if (s.currentTop != newTop) {
                        s.stickyElement.css('position', 'fixed').css('top', newTop).addClass(s.className);
                        s.currentTop = newTop;
                    }
                }
            }
        },
        resizer = function() {
            windowHeight = $window.height();
        };

    // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroller);
        window.attachEvent('onresize', resizer);
    }

    $.fn.sticky = function(options) {
        var o = $.extend(defaults, options);
        return this.each(function() {
            var stickyElement = $(this);
            if (o.center)
                var centerElement = "margin-left:auto;margin-right:auto;";

            stickyId = stickyElement.attr('id');
            stickyElement
                .wrapAll('<div id="' + stickyId + 'StickyWrapper" style="' + centerElement + '"></div>')
                .css('width', stickyElement.width());
            var elementHeight = stickyElement.outerHeight(),
                stickyWrapper = stickyElement.parent();
            stickyWrapper
                .css('width', stickyElement.outerWidth())
                .css('height', elementHeight)
                .css('clear', stickyElement.css('clear'));
            sticked.push({
                topSpacing: o.topSpacing,
                bottomSpacing: o.bottomSpacing,
                stickyElement: stickyElement,
                currentTop: null,
                stickyWrapper: stickyWrapper,
                elementHeight: elementHeight,
                className: o.className
            });
        });
    };
})(jQuery);