(function($, _) {

  // from Underscorejs
  // We copy it here to avoid conflicts with _.templateSettings
  var _template = function(str, data) {

    var c  = {
      evaluate    : /<%([\s\S]+?)%>/g,
      interpolate : /<%=([\s\S]+?)%>/g
    };

    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.interpolate, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(c.evaluate || null, function(match, code) {
           return "');" + code.replace(/\\'/g, "'")
                              .replace(/[\r\n\t]/g, ' ') + "__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";

    var func = new Function('obj', tmpl);

    return data ? func(data) : func;
  };

// From backbonejs
var escapeHTML = function(string) {
  if (!string) return '';
  return ('' + string).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
};

// Twitter bootstrap-friendly HTML boilerplate for standard inputs
var defaultFieldTemplate = function(inner) {
  return '<div class="clearfix"><label for="<%= elt.id %>"><%= schema.title %></label><div class="input">'+inner+'<% if (schema.description) { %><span class="help-inline"><%= schema.description %></span><% } %></div></div>';
};

var defaultTemplates = {
  'text':     defaultFieldTemplate('<input class="xlarge" type="text" name="<%= elt.name %>" value="<%= escape(elt.value) %>" id="<%= elt.id %>" />'),
  'textarea': defaultFieldTemplate('<textarea id="<%= elt.id %>" name="<%= elt.name %>"><%= elt.value %></textarea>'),
  'fieldset': '<fieldset><legend><%= elt.legend %></legend><%= elt.itemshtml %></fieldset>',
  'submit':   '<input type="submit" id="<%= elt.id %>" class="btn primary" value="<%= elt.value %>"/>',
  'actions':  '<div class="actions"><%= elt.itemshtml %></div>',
  'select':   defaultFieldTemplate('<select name="<%= elt.name %>" id="<%= elt.id %>"><% _.each(elt.options, function(key, val) { if (elt.value == key) { %><%= "<option selected value="+key+">"+key+"</option>" %><% } else{ %><%= "<option value="+key+">"+key+"</option>" %><%}}); %></select>')
};

var buildForm = function(options) {

  // options.schema   = options
  // options.elements = string if we want to add elements defined in the schema 
  //                    OR object describing a new kind of element not available in options.schema

  var str = '';

  _.each(options.elements, function(elt) {
    var schema = {};

    // JSON schema shorthand
    if (options.schema && !options.schema.properties) {
      options.schema = {properties: options.schema};
    }

    // Needs refactoring, right? :)
    if (elt === '*') {
      _.each(options.schema.properties, function(elt, key) {
        console.log('key', key, 'elt', elt);

        // Use global values
        if (options.value && options.value[key]) {
          elt.value = options.value[key];
        }

        // Use local value
        if (!elt.value && schema['default']) {
          elt.value = schema['default'];
        }

        if ((elt.type == 'number' || elt.type == 'string') && !elt['enum']) {
          elt.type = 'text';
        } else if (typeof elt['enum'] != 'undefined') {
          elt.type = 'select';
          elt.options = elt['enum'];
        }

        elt.template = defaultTemplates[elt.type];

        if (!elt.title) {
          elt.title = key;
        }

        elt.name = key;
        elt.id = key;

        var eltstr = _template(elt.template)({'elt': elt, 'schema': elt, 'escape': escapeHTML});

        str += eltstr;
      });

      // we need to take actions into account too

      return str;
    }

    if (_.isString(elt)) {
      elt = {
        'key': elt
      };
    }

    if (elt.key) {
      schema = options.schema.properties[elt.key];

      if (!schema) {
        throw new Error(elt.key + ' has no schema');  
      }

      //Use global values
      if (options.value && options.value[elt.key]) {
        elt.value = options.value[elt.key];
      }

      //Use local value
      if (!elt.value && schema['default']) {
        elt.value = schema['default'];
      }
    }

    if (!elt.type) {
      if ((schema.type == 'number' || schema.type == 'string') && !schema['enum']) {
        elt.type = 'text';
      } else if (typeof schema['enum'] != 'undefined') {
        elt.type = 'select';
        elt.options = schema['enum'];
      }
    }

    if (elt.items) {
      var suboptions = _.clone(options);
      suboptions.elements = elt.items;
      elt.itemshtml = buildForm(suboptions);
    }

    if (!elt.template) {
      elt.template = defaultTemplates[elt.type];
    }

    if (!schema.title) {
      schema.title = elt.key;
    }

    elt.name = elt.id || elt.key;
    elt.id = elt.id || elt.key;

    var eltstr = _template(elt.template)({'elt': elt, 'schema': schema, 'escape': escapeHTML});

    str += eltstr;
  });

  return str;
};

$.fn.jsonForm = function(options) {
  this.append(buildForm(options));

  this.bind('submit', function(event) {
    var formArray = $(this).serializeArray();

    var value = {};
    for (var i = 0; i < formArray.length; i++) {
      if (formArray[i].name) {
        value[formArray[i].name] = formArray[i].value;
      }
    }

    if (options.onSubmit) {
      if (!options.onSubmit(value)) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  });
};

})(jQuery, _);