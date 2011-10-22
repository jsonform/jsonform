(function($, _) {

  var jsonform = {};

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
jsonform.defaultFieldTemplate = function(inner) {
  return '<div class="clearfix">'+
          '<label for="<%= elt.id %>"><%= schema.title %></label>'+
            '<div class="input <% if (elt.prepend) { %>input-prepend<% } %> <% if (elt.append) { %>input-append<% } %>">'+
            '<% if (elt.prepend) { %><label class="add-on"><%= elt.prepend %></label><% } %>'+
            inner+
            '<% if (elt.append) { %><label class="add-on"><%= elt.append %></label><% } %>'+
            '<% if (schema.description) { %><span class="help-inline"><%= schema.description %></span><% } %>'+
          '</div></div>';
};

jsonform.defaultTemplates = {
  'text':     jsonform.defaultFieldTemplate('<input class="xlarge" type="text" name="<%= elt.name %>" value="<%= escape(elt.value) %>" id="<%= elt.id %>" />'),
  'textarea': jsonform.defaultFieldTemplate('<textarea id="<%= elt.id %>" name="<%= elt.name %>"><%= elt.value %></textarea>'),
  'fieldset': '<fieldset><legend><%= elt.legend %></legend><%= elt.itemshtml %></fieldset>',
  'submit':   '<input type="submit" id="<%= elt.id %>" class="btn primary" value="<%= elt.value %>"/>',
  'actions':  '<div class="actions"><%= elt.itemshtml %></div>',
  'select':   jsonform.defaultFieldTemplate('<select name="<%= elt.name %>" id="<%= elt.id %>"><% _.each(elt.options, function(key, val) { if (elt.value == key) { %><%= "<option selected value="+key+">"+key+"</option>" %><% } else{ %><%= "<option value="+key+">"+key+"</option>" %><%}}); %></select>')
};

//Allow to access subproperties by splitting "."
var getObjKey = function(obj,key) {

  var innerobj = obj;
  var keyparts = key.split(".");
  for (var i=0;i<keyparts.length;i++) {
    if (typeof innerobj!="object") return null;
    innerobj = innerobj[keyparts[i]];
  }
  return innerobj;
};

var setObjKey = function(obj,key,value) {
  var innerobj = obj;
  var keyparts = key.split(".");
  for (var i=0;i<keyparts.length-1;i++) {
    if (typeof innerobj[keyparts[i]]!="object") innerobj[keyparts[i]] = {};
    innerobj = innerobj[keyparts[i]];
  }
  innerobj[keyparts[keyparts.length-1]] = value;
};

var getSchemaKey = function(schema,key) {
  return getObjKey(schema,key.replace(/\./g,".properties."));
};


var buildOneElement = function(elt,options) {
  var schema = {};

  var eventhandlers = [];

  if (elt.key) {

    elt.name = elt.name || elt.key;
    elt.id = elt.id || "jsonform-elt-"+elt.key;

    schema = getSchemaKey(options.schema.properties,elt.key);

    if (!schema) {
      throw new Error(elt.key + ' has no schema');  
    }

    //Plug custom behaviours
    if (options.onElementSchema) {
      options.onElementSchema(elt,schema);
    }

    //Use global values
    if (options.value && getObjKey(options.value,elt.key)) {
      elt.value = getObjKey(options.value,elt.key);
    }

    //Use local value
    if (!elt.value && schema['default']) {
      elt.value = schema['default'];
    }

    //Plug custom behaviours
    if (options.onElementValue) {
      options.onElementValue(elt,schema);
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
    suboptions.form = elt.items;
    var tmp = jsonform.buildForm(suboptions);
    elt.itemshtml = tmp.html;
    eventhandlers = eventhandlers.concat(tmp.eventhandlers);
  }

  if (!elt.template) {
    elt.template = jsonform.defaultTemplates[elt.type];
  }

  if (!schema.title) {
    schema.title = elt.key;
  }
  


  //TODO other events
  if (elt.onChange) {
    eventhandlers.push(["#"+elt.id,"change",elt.onChange]);
  }

  //console.log("elt",elt);

  var eltstr = _template(elt.template)({'elt': elt, 'schema': schema, 'escape': escapeHTML});

  return {
    "html":eltstr,
    "eventhandlers":eventhandlers
  };

};


var walkElementsInSchema = function(schema, options,prefix) {
  var str = "";
  var eventhandlers = [];
  var tmp;
  _.each(schema.properties, function(prop, key) {
    if (prop.properties) {
      tmp = walkElementsInSchema(prop,options,prefix+key+".");
    } else {
      tmp = buildOneElement({'key':prefix+key},options);
    }
    str+=tmp.html;
    eventhandlers = eventhandlers.concat(tmp.eventhandlers);
  });

  return {
    "html":str,
    "eventhandlers":eventhandlers
  };
};

jsonform.buildForm = function(options) {

  // options.schema   = options
  // options.form = string if we want to add elements defined in the schema 
  //                    OR object describing a new kind of element not available in options.schema

  var str = '';
  var eventhandlers = [];
  var tmp;

  // JSON schema shorthand
  if (options.schema && !options.schema.properties) {
    options.schema = {properties: options.schema};
  }

  _.each(options.form, function(elt) {

    //Shorthand for adding every field in the schema automatically.
    if (elt === '*') {
      tmp= walkElementsInSchema(options.schema,options,"");
      str+=tmp.html;
      eventhandlers=eventhandlers.concat(tmp.eventhandlers);
      return;
    }

    if (_.isString(elt)) {
      elt = {
        'key': elt
      };
    }

    tmp=buildOneElement(elt,options);
    str+=tmp.html;
    eventhandlers=eventhandlers.concat(tmp.eventhandlers);

  });

  return {
    "html":str,
    "eventhandlers":eventhandlers
  };
};

jsonform.getFormValue = function(formelt) {
  var formArray = $(this).serializeArray();

    var value = {};
    for (var i = 0; i < formArray.length; i++) {
      if (formArray[i].name) {
        setObjKey(value, formArray[i].name, formArray[i].value);
      }
    }
};

$.fn.jsonForm = function(options) {
  var form = jsonform.buildForm(options);

  this.append(form.html);

  for (var i=0;i<form.eventhandlers.length;i++) {
     $(form.eventhandlers[i][0].replace(/\./g,"\\.")).bind(form.eventhandlers[i][1],form.eventhandlers[i][2]);
  }

  this.bind('submit', function(event) {
    var value = jsonform.getFormValue(this);
    
    if (options.onSubmit) {
      if (!options.onSubmit(value)) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  });
};

$.fn.getFormValue = function() {
  return jsonform.getFormValue(this);
};

window.JSONForm = jsonform;

})(jQuery, _);