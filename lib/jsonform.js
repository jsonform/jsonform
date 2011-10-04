(function($,_) {

var defaultTemplates = {
  'text':     '<label for="<%= id %>"><%= name %></label><div class="input"><input type="text" name="<%= name %>" id="<%= id %>"></div>',
  'fieldset': '<fieldset><%= itemshtml %></fieldset>',
  'submit':   '<label for="<%= id %>"><%= name %></label><div class="input"><input type="submit" value="OK"></div>',
  'select':   '<label for="<%= id %>"><%= name %></label><div class="input"><select name="<%= name %>" id="<%= id %>"><% _.each(options, function(key, val) { %><%= "<option>1</option>" %><% }) %></select></div>'
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
      if ((schema.type == 'number' || schema.type == 'string') && !schema.enum) {
        elt.type = 'text';
      } else if (typeof schema.enum != 'undefined') {
        elt.type = 'select';
        elt.options = schema.enum;
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

    elt.name = elt.key;
    elt.id = elt.key;

    console.log('elt', elt);

    var eltstr = _.template(elt.template)(elt);

    str += eltstr;

  });

  return str;

};


$.fn.jsonForm = function(options) {
  this.append(buildForm(options));
};

})(jQuery,_);