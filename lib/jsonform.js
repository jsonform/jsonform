(function($,_) {

// Twitter bootstrap-friendly HTML boilerplate for standard inputs
var defaultFieldTemplate = function(inner) {
  return '<div class="clearfix"><% if (schema.title) { %><label for=""><%= schema.title %></label><% } %><div class="input">'+inner+'<% if (schema.description) { %><span class="help-inline"><%= schema.description %></span><% } %></div></div>';
};

var defaultTemplates = {
  'text':defaultFieldTemplate('<input class="xlarge" type="text" name="<%= elt.name %>" />'),
  'textarea':defaultFieldTemplate('<textarea><%= elt.value %></textarea>'),
  'fieldset':'<fieldset><legend><%= elt.legend %></legend><%= elt.itemshtml %></fieldset>',
  'submit':'<input type="submit" class="btn primary" value="OK"/>',
  'actions':'<div class="actions"><%= elt.itemshtml %></div>',
  'select':defaultFieldTemplate('<select name="<%= name %>" id="<%= elt.id %>"><% _.each(elt.options, function(key, val) { %><%= "<option value="+key+">"+key+"</option>" %><% }); %></select>')
};

var buildForm = function(options) {

  var str = '';

  _.each(options.elements,function(elt) {

    if (_.isString(elt)) {
      elt = {
        'key': elt
      };
    }

    var schema = {};

    if (elt.key) {
      schema = options.schema.properties[elt.key];

      if (!schema) {
        throw new Error(elt.key + ' has no schema');  
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

    if (!elt.value && schema["default"]) {
      elt.value = schema["default"];
    }

    if (elt.items) {
      var suboptions = _.clone(options);
      suboptions.elements = elt.items;
      elt.itemshtml = buildForm(suboptions);
    }

    if (!elt.template) {
      elt.template = defaultTemplates[elt.type];
    }

    elt.name = elt.key;
    elt.id = elt.key;
    var eltstr = _.template(elt.template)({"elt":elt,"schema":schema});

    str += eltstr;

  });

  return str;

};


$.fn.jsonForm = function(options) {
  this.append(buildForm(options));
};

})(jQuery,_);