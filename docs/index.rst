.. jQuery Form Watcher documentation master file, created by
   sphinx-quickstart on Tue Apr 22 22:21:48 2014.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

jQuery Form Watcher
===================

jQuery plugin to watch the form field’s. When a field is updated it trigger an event on the form.

This plugin can be usefull when you want to submit the form in ajax, you only call the submit function if some updates have been made. Also it can be use when you have an autosave system of your form.

Usage
-----


Include the javascript

.. code::

    <script type="text/javascript" src="jquery.formwatcher.js"></script>


Call the plugin

.. code::

    $('form-selector').formwatcher();


Example of usage for the HTML bellow

.. code::

    <form id="myform">
        <input type="text" value="" />
    </form>

.. code::

    $('#myform').formwatcher().on('dirty.formwatcher', function() {
        alert('The form is dirty');
    }).on('clean.formwatcher', function() {
        alert('The form is clean');
    });


So when you update the input it will trigger the event dirty.formwatcher. If you reput the initial value, the event clean.formwatcher is triggered.

If you want to check there are some updates before submitting

.. code::

    $('#myform').formwatcher().on('submit', function(e) {
        if ($(this).data('formwatcher').status !== 'dirty') {
            // No update on the form
            e.preventDefault();
        }
    });

`See the full demo <http://lereskp.github.io/jquery.formwatcher/>`_



