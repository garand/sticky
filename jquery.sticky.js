// Sticky Plugin
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2011-02-14
// Date: 2012-08-30
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.

(function($) {
    var defaults = {
            topSpacing: 0,
            bottomSpacing: 0,
            elementClassName: 'is-sticky',
            wrapperClassName: 'sticky-wrapper'
        },
        $window = $(window),
        $document = $(document),
        sticked = ( typeof sticked != 'undefined' && sticked instanceof Array ) ? sticked : [];
        windowHeight = $window.height(),
        scroller = function(forceRefresh) {
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
                        s.stickyElement
                            .css('position', '')
                            .css('top', '')
                            .removeClass(s.elementClassName);
                        s.stickyElement.parent().removeClass(s.elementClassName);
                        s.currentTop = null;
                    }
                }
                else {
                    var newTop = documentHeight - s.stickyElement.outerHeight()
                        - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                    if (newTop < 0) {
                        newTop = newTop + s.topSpacing;
                    } else {
                        newTop = s.topSpacing;
                    }
                    if ( (s.currentTop != newTop) || (forceRefresh == true) ) {
                        s.stickyElement
                            .css('position', 'fixed')
                            .css('top', newTop)
                            .addClass(s.elementClassName);
                        s.stickyElement.parent().addClass(s.elementClassName);
                        s.currentTop = newTop;
                    }
                }
            }
        },
        resizer = function() {
            windowHeight = $window.height();
        },
        methods = {
            init: function(options) {
                var o = $.extend(defaults, options);
                return this.each(function() {
                    var stickyElement = $(this);

                    stickyId = stickyElement.attr('id');
                    wrapper = $('<div></div>')
                        .attr('id', stickyId + '-sticky-wrapper')
                        .addClass(o.wrapperClassName);
                    stickyElement.wrapAll(wrapper);
                    var stickyWrapper = stickyElement.parent();
                    stickyWrapper.css('height', stickyElement.outerHeight());
                    stickyElement.attr('data-position', stickyElement.css('position'));
                    stickyElement.attr('data-top', stickyElement.css('top'));
                    sticked.push({
                        topSpacing: o.topSpacing,
                        bottomSpacing: o.bottomSpacing,
                        stickyElement: stickyElement,
                        currentTop: null,
                        stickyWrapper: stickyWrapper,
                        elementClassName: o.elementClassName
                    });
                    scroller(true);
                });
            },
            destroy: function(options) {
                var o = $.extend(defaults, options);
                return this.each(function() {
                    var stickyElement = $(this);
                    var stickyWrapper = stickyElement.parent();

                    stickyElement
                        .css('position', stickyElement.attr('data-position'))
                        .css('top', stickyElement.attr('data-top'))
                        .removeAttr('data-position')
                        .removeAttr('data-top')
                        .removeClass(o.elementClassName)
                        .unwrap();

                    var elementsToRemove = [];
                    
                    for (var i = 0; i < sticked.length; i++) {
                        var s = sticked[i];
                        if (s.stickyElement.attr('id') === stickyElement.attr('id')) elementsToRemove.push(i);
                    }
                    for (var i = 0; i < elementsToRemove.length; i++) {
                        sticked.splice(elementsToRemove[i], 1);
                    }
                    elementsToRemove = null;
                });
            },
            update: scroller
        };

    // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroller);
        window.attachEvent('onresize', resizer);
    }

    $.fn.sticky = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    };
    $(function() {
        setTimeout(scroller, 0);
    });
})(jQuery);