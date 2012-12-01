# Sticky

Sticky is a jQuery plugin that gives you the ability to make any element on your page always stay visible.

## Sticky in brief

This is how it works:

- When the target element is about to be hidden, the plugin will add the class `className` to it (and to a wrapper added as its parent), set it to `position: fixed` and calculate its new `top`, based on the element's height, the page height and the `topSpacing` and `bottomSpacing` options.
- That's it. In some cases you might need to set a fixed width to your element when it is "sticked". Check the `example-*.html` files for some examples.

## Usage

- Include jQuery & Sticky.
- Call Sticky.

```javascript
<script src="jquery.js"></script>
<script src="jquery.sticky.js"></script>
<script>
  $(document).ready(function(){
    $("#sticker").sticky({topSpacing:0});
  });
</script>
```

- Edit your css to position the elements (check the examples in `example-*.html`).

## Options

- `topSpacing`: Pixels between the page top and the element's top.
- `bottomSpacing`: Pixels between the page bottom and the element's bottom.
- `className`: CSS class added to the element and its wrapper when "sticked".
- `wrapperClassName`: CSS class added to the wrapper.
- `stuckClassName`: CSS class added to wrapper when element is re-stuck to page.
- `stickTo`: jQuery selector string of element at which point the sticky element should unstick from scrolling, re-stick to page. (May be passed as HTML5 data attribute on sticky element.)
- `stickDelay`: Integer that is the number of pixels sticky element should scroll off screen before sticking to scroll. (May be passed as HTML5 data attribute on sticky element.)

## Methods

- `sticky(options)`: Initializer. `options` is optional.
- `sticky('update')`: Recalculates the element's position.
 