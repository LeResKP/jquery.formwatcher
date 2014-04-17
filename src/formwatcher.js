/*
 * formwatcher
 * https://github.com/LeResKP/jquery.formwatcher
 *
 * Copyright (c) 2014 Aurélien Matouillot
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.formwatcher = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.formwatcher = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.formwatcher.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.formwatcher.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].formwatcher = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
