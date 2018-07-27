JSON Form
=========

![MIT license](https://img.shields.io/badge/License-MIT-blue.svg?longCache=true)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?longCache=true)
![Maintained](https://img.shields.io/badge/Maintained-yes-brightgreen.svg?longCache=true)
![Release](https://img.shields.io/github/release/jsonform/jsonform.svg)
![NPM: released](https://img.shields.io/npm/v/jsonform.svg)

The JSON Form library is a JavaScript client-side library that takes a
structured data model defined using [JSON Schema](http://json-schema.org/) as
input and returns a [Bootstrap 3](https://getbootstrap.com/docs/3.3/)-friendly
HTML form that matches the schema.

The generated HTML form includes client-side validation logic that provides direct inline feedback to the user upon form submission (provided a JSON Schema validator is available). If values are valid, the JSON Form library uses submitted values to create the JavaScript data structure that matches the data model.

The layout of the generated HTML form may be entirely fine-tuned through
a simple declarative mechanism.


Getting started
---------------

The example below creates a form that asks for the user's name and age. The user's name is a required field, while the age is optional.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Getting started with JSON Form</title>
    <link rel="stylesheet" style="text/css" href="deps/opt/bootstrap.css" />
  </head>
  <body>
    <h1>Getting started with JSON Form</h1>
    <form></form>
    <div id="res" class="alert"></div>
    <script type="text/javascript" src="deps/jquery.min.js"></script>
    <script type="text/javascript" src="deps/underscore.js"></script>
    <script type="text/javascript" src="deps/opt/jsv.js"></script>
    <script type="text/javascript" src="lib/jsonform.js"></script>
    <script type="text/javascript">
      $('form').jsonForm({
        schema: {
          name: {
            type: 'string',
            title: 'Name',
            required: true
          },
          age: {
            type: 'number',
            title: 'Age'
          }
        },
        onSubmit: function (errors, values) {
          if (errors) {
            $('#res').html('<p>I beg your pardon?</p>');
          }
          else {
            $('#res').html('<p>Hello ' + values.name + '.' +
              (values.age ? '<br/>You are ' + values.age + '.' : '') +
              '</p>');
          }
        }
      });
    </script>
  </body>
</html>
```

Loading this page in a browser renders a form with two input fields and a submit button. The ```onSubmit``` function is called upon form submission. If you press "Submit" without entering values or if the age you enter is not a number, error messages appear next to the input fields.

NB: Paths in this example are relative to the root of the JSON Form project.


Documentation
-------------

You can do much more with the JSON Form library. You may define a more complex data model that includes arrays and objects for instance, or you may control the layout of the form to include fieldsets, expandable sections or tabs. For more information, check the [reference documentation for JSON Form](http://github.com/joshfire/jsonform/wiki).


Playground
----------
If you're more of the acting type than of the reading type, the [JSON Form Playground](https://jsonform.github.io/jsonform/playground/index.html) is a simple JSON Form editor that lets you try out and extend all the examples in the doc.

Dependencies
------------

At a minimum, the JSON Form library depends on:
- [jQuery](http://jquery.com/)
- The [Underscore.js](http://underscorejs.org/) utility belt

The JSON Form library may require further libraries, depending on the features you need for the forms you need to render. In particular:
- [ACE](http://ace.ajax.org/) is needed to render rich text input fields. The [deps/opt/ace](https://github.com/joshfire/jsonform/tree/master/deps/opt/ace) folder contains a minimal set of files from ACE to render a JSON input field. Beware that the code of `ace.js` needs to be encapsulated in `(function(require,define,requirejs) {...})(undefined,undefined,undefined);` before it may be used within JSON Form.
- [Bootstrap](https://getbootstrap.com/docs/3.3/) v3.3 or above is more or less needed (unless you enjoy ugly forms, that is) if you don't provide your own styles. JSON Form only needs the ```bootstrap.css``` file.
- The [JSON Schema Validator](https://github.com/garycourt/JSV) is used to detect and report validation errors upon form submission. The [deps/opt](https://github.com/joshfire/jsonform/tree/master/deps/opt) folder contains a "build" of the JSON Schema Validator for use in JSON Form.
- [Bootstrap Dropdowns](https://github.com/twbs/bootstrap/blob/master/javascript.html) v2.0.3 or above is needed for ```imageselect``` fields.
- [jQuery UI Sortable](http://jqueryui.com/demos/sortable/) v1.8.20 or above is required for drag-and-drop support within arrays and tabarrays. Note the plugin itself depends on jQuery IU Core, jQuery UI Mouse, and jQuery UI Widget.
- [wysihtml5](http://jhollingworth.github.com/bootstrap-wysihtml5/) is required if the form uses ```wysihtml5``` textarea fields.
- [Spectrum](http://bgrins.github.com/spectrum/) is required if the form uses `color` fields.

All of these libraries are in the [deps](https://github.com/joshfire/jsonform/tree/master/deps) folder for now, although you might want to check their respective Web site for more recent versions.

NB: JSON Form also uses ```JSON.parse``` and ```JSON.stringify``` which is normally already natively supported by all modern browsers.


License
-------

The JSON Form library is licensed under the [MIT license](https://raw.github.com/joshfire/jsonform/master/LICENSE).

All the libraries that JSON Form may depend on are licensed under the MIT license, except for the JSON Schema Validator, licensed under the BSD 3 Clause license and the ACE editor licensed under the Mozilla tri-license (MPL/GPL/LGPL).
