# Sticky

Sticky is a jQuery plugin that gives you the ability to make any element on your page always stay visible.

## Sticky in brief

This is how it works:

- When the target element is about to be hidden, the plugin will add the class `className` to it (and to a wrapper added as its parent), set it to `position: fixed` and calculate its new `top`, based on the element's height, the page height and the `topSpacing` and `bottomSpacing` options.
- That's it. 
In some cases you might need to set a fixed width to your element when it is "sticked".
But by default (`widthFromWrapper == true`) sticky updates elements's width to the wrapper's width.
Check the `example-*.html` files for some examples.

## Usage

- Include jQuery & Sticky.
- Call Sticky.

```html
<script src="jquery.js"></script>
<script src="jquery.sticky.js"></script>
<script>
  $(document).ready(function(){
    $("#sticker").sticky({topSpacing:0});
  });
</script>
```

- Edit your css to position the elements (check the examples in `example-*.html`).

- To unstick an object

```html
<script>
  $("#sticker").unstick();
</script>
```

## Options

- `topSpacing`: (default: `0`) Pixels between the page top and the element's top.
- `bottomSpacing`: (default: `0`) Pixels between the page bottom and the element's bottom.
- `className`: (default: `'is-sticky'`) CSS class added to the element's wrapper when "sticked".
- `wrapperClassName`: (default: `'sticky-wrapper'`) CSS class added to the wrapper.
- `center`: (default: `false`) Boolean determining whether the sticky element should be horizontally centered in the page.
- `getWidthFrom`: (default: `''`) Selector of element referenced to set fixed width of "sticky" element.
- `widthFromWrapper`: (default: `true`) Boolean determining whether width of the "sticky" element should be updated to match the wrapper's width. Wrapper is a placeholder for "sticky" element while it is fixed (out of static elements flow), and its width depends on the context and CSS rules. Works only as long `getWidthForm` isn't set.
- `responsiveWidth`: (default: `false`) Boolean determining whether widths will be recalculated on window resize (using getWidthfrom).
- `zIndex`: (default: `inherit`) controls z-index of the sticked element.

## Methods

- `sticky(options)`: Initializer. `options` is optional.
- `sticky('update')`: Recalculates the element's position.

## Events

- `sticky-start`: When the element becomes sticky.
- `sticky-end`: When the element returns to its original location
- `sticky-update`: When the element is sticked but position must be updated for constraints reasons
- `sticky-bottom-reached`: When the element reached the bottom space limit
- `sticky-bottom-unreached`: When the element unreached the bottom space limit

To subscribe to events use jquery:

```html
<script>
  $('#sticker').on('sticky-start', function() { console.log("Started"); });
  $('#sticker').on('sticky-end', function() { console.log("Ended"); });
  $('#sticker').on('sticky-update', function() { console.log("Update"); });
  $('#sticker').on('sticky-bottom-reached', function() { console.log("Bottom reached"); });
  $('#sticker').on('sticky-bottom-unreached', function() { console.log("Bottom unreached"); });
</script>
```
