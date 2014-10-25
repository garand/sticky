(function ( $ ) {

  $.fn.sticky = function( options ) {

    var _this = this;

    return this.each(function() {

      var parentWidth;
      var widthPercentage;
      var width;
      var topSpace;
      var bottomSpace;

      var settings = $.extend({
        container: _this.parent(),
        topSpacing: 0,
        stickyClass: 'is-sticky'
      }, options );

      calculate();

      // $( window ).resize(function(){
      // if ( _this.hasClass( settings.stickyClass ) ) {
      //     calculate();
      //     _this.css({ width: width });

      //     contain();
      //   }
      // });

      $( window ).scroll(function(){
        if ( ( topSpace <= $( window ).scrollTop() && ( !_this.hasClass( settings.stickyClass ) ) ) || _this.hasClass( 'is-bottom' ) ) {
          _this.addClass( settings.stickyClass )
               .css({ position: 'fixed', top: settings.topSpacing, width: width, zIndex: 1 });
        }
        else if ( _this.attr( 'style' ) && topSpace > $( window ).scrollTop() ) {
          _this.removeClass( settings.stickyClass )
               .removeAttr( 'style' );
        }

        contain();
      });

      function calculate() {
        parentWidth = $( _this ).parent().outerWidth( false );
        widthPercentage = $( _this ).outerWidth( true ) / parentWidth;
        width = parentWidth * widthPercentage -
                    parseInt( $( _this ).css( "border-left-width" ) ) -
                    parseInt( $( _this ).css( "margin-left" ) ) -
                    parseInt( $( _this ).css( "border-right-width" ) ) -
                    parseInt( $( _this ).css( "margin-right" ) );
        topSpace = $( _this ).offset().top -
                       parseInt( $( _this ).css( "border-top-width" ) ) -
                       parseInt( $( _this ).css( "margin-top" ) ) -
                       parseInt( $( _this ).css( "padding-top" ) ) -
                       settings.topSpacing;
        bottomSpace = parseInt( $( _this ).css( "border-bottom-width" ) ) +
                          parseInt( $( _this ).css( "margin-bottom" ) ) +
                          parseInt( $( _this ).css( "padding-bottom" ) );
      }

      function contain() {
        if ( settings.container ) {
          var containerHeight = settings.container.outerHeight( true );
          var containerOffset = settings.container.offset().top;
          var thisHeight = _this.outerHeight( true );
          var thisOffset = _this.offset().top + bottomSpace;
          var viewportHeight = $(window).height();

          if ( ( ( containerHeight + containerOffset ) - ( thisHeight + thisOffset + bottomSpace ) ) <= 0 ) {
            _this.addClass( 'is-bottom' )
                 .css({
                   position: 'fixed',
                   top: 'auto',
                   bottom: '52px'
                 });
          }
          else {
            _this.removeClass( 'is-bottom' );
          }
        }
      }
    });

  };

}( jQuery ));