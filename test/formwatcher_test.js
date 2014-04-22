(function($) {
    "use strict";

    var FormWatcher = $.fn.formwatcher.Constructor;

  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

    module('jQuery#formwatcher', {
        // This will run before each test in this module.
        // setup: function() {
        //   this.elems = $('#qunit-fixture').children();
        // }
    });

    test('init', function() {
        expect(10);
        var form = $('#form');
        var fw = new FormWatcher(form);
        strictEqual(fw.$element.attr('id'), form.attr('id'));
        strictEqual(fw.$inputs.length, 7);
        var dirty_cnt = 0;
        var clean_cnt = 0;
        form.bind('dirty.formwatcher', function() {
            dirty_cnt += 1;
        });

        form.bind('clean.formwatcher', function() {
            clean_cnt += 1;
        });

        var $input = $(fw.$inputs[0]);
        $input.trigger('keyup');
        strictEqual(dirty_cnt, 0);
        strictEqual(clean_cnt, 0);

        $input.val('hello');
        $input.trigger('keyup');
        strictEqual(dirty_cnt, 1);
        strictEqual(clean_cnt, 0);

        // The form is already dirty
        $input.trigger('change');
        strictEqual(dirty_cnt, 1);
        strictEqual(clean_cnt, 0);

        $input.val('Hello world');
        $input.trigger('keyup');
        strictEqual(dirty_cnt, 1);
        strictEqual(clean_cnt, 1);
    });

    test('getVal', function() {
        expect(7);
        var form = $('#form');
        var fw = new FormWatcher(form);

        var $input = $(fw.$inputs[0]);
        var $radio1 = $(fw.$inputs[1]);
        var $radio2 = $(fw.$inputs[2]);
        var $checkbox1 = $(fw.$inputs[3]);
        var $checkbox2 = $(fw.$inputs[4]);
        var $select1 = $(fw.$inputs[5]);
        var $select2 = $(fw.$inputs[6]);

        var res = fw.getVal($input);
        strictEqual(res, 'Hello world');

        res = fw.getVal($radio1);
        strictEqual(res, false);

        res = fw.getVal($radio2);
        strictEqual(res, true);

        res = fw.getVal($checkbox1);
        strictEqual(res, false);

        res = fw.getVal($checkbox2);
        strictEqual(res, true);

        res = fw.getVal($select1);
        strictEqual(res, '');

        res = fw.getVal($select2);
        strictEqual(res, 's4');
    });

    test('checkChange', function() {
        expect(15);
        var form = $('#form');
        var fw = new FormWatcher(form);

        var $radio1 = $(fw.$inputs[1]);
        var $checkbox1 = $(fw.$inputs[3]);

        var dirty_cnt = 0;
        var clean_cnt = 0;
        form.bind('dirty.formwatcher', function() {
            dirty_cnt += 1;
        });

        form.bind('clean.formwatcher', function() {
            clean_cnt += 1;
        });

        $radio1.prop('checked', true);
        $radio1.trigger('change');
        strictEqual(dirty_cnt, 1);
        strictEqual(clean_cnt, 0);
        strictEqual(fw.$updatedElements.length, 1);
        strictEqual(fw.$updatedElements[0], 1);

        // The form is already dirty
        $radio1.trigger('change');
        strictEqual(dirty_cnt, 1);
        strictEqual(clean_cnt, 0);
        strictEqual(fw.$updatedElements.length, 1);
        strictEqual(fw.$updatedElements[0], 1);

        $radio1.prop('checked', false);
        $radio1.trigger('change');
        strictEqual(dirty_cnt, 1);
        strictEqual(clean_cnt, 1);
        strictEqual(fw.$updatedElements.length, 0);

        $checkbox1.prop('checked', true);
        $checkbox1.trigger('change');
        strictEqual(dirty_cnt, 2);
        strictEqual(clean_cnt, 1);
        strictEqual(fw.$updatedElements.length, 1);
        strictEqual(fw.$updatedElements[0], 2);
    });

    test('plugin', function() {
        expect(1);
        var fw = $('#form').formwatcher();
        ok(fw.data('formwatcher'));
    });

}(jQuery));
