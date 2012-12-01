// Sticky Plugin
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Improvements by Hunter Dougless (hntrdglss)
// Created: 2/14/2011
// Date: 12/1/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//       It will only set the 'top' and 'position' of your element, you
//       might need to adjust the width in some cases.

(function($) {
  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      stuckClassName: 'is-stuck',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      stickTo: '',
      stickDelay: 0
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
          etse = elementTop - s.topSpacing - extra + s.stickDelay,
          ebse = (s.stickTo.length) ? s.stickTo.outerHeight() + s.stickTo.offset().top
             - s.stickyElement.outerHeight() - s.bottomSpacing - s.topSpacing - extra : null;
        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css('position', '')
              .css('top', '')
              .removeClass(s.className);
            s.stickyElement.parent().removeClass(s.className);
            s.currentTop = null;
          }
        }
        else if (ebse !== null && scrollTop > ebse) {
          if (s.stickyElement.hasClass(s.className)) {
            // var newTop = scrollTop - $(s.stickyElement.parent().offsetParent()).offset().top + s.topSpacing; // if scrolling too quickly, sticks past end
            var newTop = s.stickTo.outerHeight() + s.stickTo.offset().top - s.stickyElement.outerHeight() - 100 - $(s.stickyElement.parent().offsetParent()).offset().top + s.topSpacing;
            s.stickyElement
              .css('position', 'absolute')
              .css('top', newTop)
              .removeClass(s.className);
            s.stickyElement.parent().removeClass(s.className).addClass(s.stuckClassName);
            s.currentTop = newTop;
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
          if (s.currentTop != newTop) {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop);

            if (typeof s.getWidthFrom !== 'undefined') {
              s.stickyElement.css('width', $(s.getWidthFrom).width());
            }

            s.stickyElement.parent().removeClass(s.stuckClassName).addClass(s.className);
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
        var o = $.extend({}, defaults, options);
        return this.each(function() {
          var stickyElement = $(this);

          stickyId = stickyElement.attr('id');
          wrapper = $('<div></div>')
            .attr('id', stickyId + '-sticky-wrapper')
            .addClass(o.wrapperClassName);
          stickyElement.wrapAll(wrapper);

          if (o.center) {
            stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") == "right") {
            stickyElement.css({float:"none"}).parent().css({float:"right"});
          }

          var stickyWrapper = stickyElement.parent();
          stickyWrapper.css('height', stickyElement.outerHeight());

          var stickTo = ($(stickyElement.data("stick-to")).length) ? $(stickyElement.data("stick-to")) : $(o.stickTo);
          var stickDelay = (stickyElement.data("stick-delay")) ? stickyElement.data("stick-delay") : o.stickDelay;

          sticked.push({
            topSpacing: o.topSpacing,
            bottomSpacing: o.bottomSpacing,
            stickyElement: stickyElement,
            stickTo: stickTo,
            stickDelay: stickDelay,
            currentTop: null,
            stickyWrapper: stickyWrapper,
            className: o.className,
            getWidthFrom: o.getWidthFrom,
            stuckClassName: o.stuckClassName
          });
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
