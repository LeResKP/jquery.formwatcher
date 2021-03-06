/*
 * formwatcher
 * https://github.com/LeResKP/jquery.formwatcher
 *
 * Copyright (c) 2014 Aurélien Matouillot
 * Licensed under the MIT license.
 */

(function($) {
    "use strict";

    var STATUS_DIRTY = 'dirty',
        STATUS_CLEAN = 'clean';

    var FormWatcher = function(element) {
        this.init(element);
    };

    FormWatcher.uniqueId = 0;

    FormWatcher.prototype.init = function(element) {
        this.$element = $(element);
        this.$inputs = $(element).find(':input');
        this.$updatedElements = [];
        this.status = STATUS_CLEAN;

        var that = this;
        this.$inputs.each(function() {
            var $this = $(this);
            $this.data('initial.formwatcher', that.getVal($this));
        });

        this.$inputs.on('change.formwatcher keyup.formwatcher', function() {
            that.checkChange($(this));
        });
    };

    FormWatcher.prototype.getVal = function(element) {
        if (element.is('[type="checkbox"],[type="radio"]')) {
            return element.is(':checked');
        }
        return element.val();
    };

    FormWatcher.prototype.checkChange = function(element) {
        if (this.getVal(element) !== element.data('initial.formwatcher')) {
            var id = element.data('uniqueId.formwatcher');
            if (typeof id === 'undefined') {
                element.data('uniqueId.formwatcher', (id=FormWatcher.uniqueId++));
            }
            if(this.$updatedElements.indexOf(id) === -1 ) {
                this.$updatedElements.push(id);
                this.$element.trigger('dirty.formwatcher');
                this.status = STATUS_DIRTY;
            }
        }
        else {
            var index = this.$updatedElements.indexOf(element.data('uniqueId.formwatcher'));
            if( index !== -1 ) {
                this.$updatedElements.pop(index);
                if(this.$updatedElements.length === 0) {
                    this.$element.trigger('clean.formwatcher');
                    this.status = STATUS_CLEAN;
                }
            }
        }
    };

    $.fn.formwatcher = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('formwatcher');
            if (!data) {
                $this.data('formwatcher', (data=new FormWatcher(this)));
            }
            if (typeof option === 'string') {
                 data[option]();
            }
        });
    };

    $.fn.formwatcher.Constructor = FormWatcher;

}(jQuery));
