(function($, _, JSON) {

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
// TODO replace by (new Option(JSON.stringify(html))).innerHTML ?
var escapeHTML = function(string) {
  if (!string) return '';
  return ('' + string).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
};

// Twitter bootstrap-friendly HTML boilerplate for standard inputs
jsonform.defaultFieldTemplate = function(inner) {
  return '<div class="clearfix">'+
          '<label for="<%= elt.id %>"><%= elt.title || schema.title %></label>'+
            '<div class="input <% if (elt.prepend) { %>input-prepend<% } %> <% if (elt.append) { %>input-append<% } %>">'+
            '<% if (elt.prepend) { %><label class="add-on"><%= elt.prepend %></label><% } %>'+
            inner+
            '<% if (elt.append) { %><label class="add-on"><%= elt.append %></label><% } %>'+
            '<% if (schema.description) { %><span class="help-inline"><%= schema.description %></span><% } %>'+
          '</div></div>';
};

var fileDisplayTemplate = '<% if (elt.value.type=="image") { %><img id="jsonformpreview-<%= elt.id %>" src="<%= elt.value.url %>" /><% } %>';

jsonform.defaultTemplates = {
  'text':     jsonform.defaultFieldTemplate('<input class="xlarge" type="text" name="<%= elt.name %>" value="<%= escape(elt.value) %>" id="<%= elt.id %>" />'),
  'textarea': jsonform.defaultFieldTemplate('<textarea id="<%= elt.id %>" name="<%= elt.name %>"><%= elt.value %></textarea>'),
  'checkbox': jsonform.defaultFieldTemplate('<ul class="inputs-list"><li><label><input type="checkbox" id="<%= elt.id %>" name="<%= elt.name %>" value="1" <% if (elt.value) {%>checked<% } %> /></label></li></ul>'),
  'file':     jsonform.defaultFieldTemplate('<input class="input-file" id="<%= elt.id %>" name="<%= elt.name %>" type="file" />'),
  'file-transloadit': jsonform.defaultFieldTemplate('<% if (elt.value) { %>'+fileDisplayTemplate+'<% } %><input id="<%= elt.id %>" type="file" name="<%= elt.name %>" />'), /*<input type="hidden" id="<%= elt.id %>" name="<%= elt.name %>" />*/
  'file-jquery-multiple': jsonform.defaultFieldTemplate('<div id="<%= elt.id %>"><div class="fileupload-buttonbar"><label class="fileinput-button"><span>Add files...</span><input type="file" name="<%= elt.name %>" multiple></label><button type="submit" class="start">Start upload</button><button type="reset" class="cancel">Cancel upload</button><button type="button" class="delete">Delete files</button></div><div class="fileupload-content"><table class="files"></table><div class="fileupload-progressbar"></div></div></div>'),
  'fieldset': '<fieldset><legend><%= elt.legend %></legend><%= elt.itemshtml %></fieldset>',
  'submit':   '<input type="submit" id="<%= elt.id %>" class="btn primary" value="<%= elt.value %>"/>',
  'button':   '<button id="<%= elt.id %>" class="btn"><%= elt.title %></button>',
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


var formFragment = function() {
  this.html = "";
  this.eventhandlers = [];
};


formFragment.prototype.concat = function(form2) {
  this.html += form2.html;
  this.eventhandlers = this.eventhandlers.concat(form2.eventhandlers);
};


formFragment.prototype.buildOneElement = function(elt,options) {
  var schema = {};

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
    } else if (schema.type=='boolean') {
      elt.type = 'checkbox';
    } else if (typeof schema['enum'] != 'undefined') {
      elt.type = 'select';
      elt.options = schema['enum'];
    }
  }

  if (elt.items) {
    var suboptions = _.clone(options);
    suboptions.form = elt.items;

    var subForm = new formFragment();
    subForm.build(suboptions);
    elt.itemshtml = subForm.html;
    subForm.html="";
    this.concat(subForm);
  }

  if (!elt.template) {
    elt.template = jsonform.defaultTemplates[elt.type];
  }

  if (!schema.title) {
    schema.title = elt.key;
  }
  
  //TODO other events
  if (elt.onChange) {
    this.eventhandlers.push(["#"+elt.id,"change",elt.onChange]);
  }
  if (elt.onClick) {
    this.eventhandlers.push(["#"+elt.id,"click",elt.onClick]);
  }
  if (elt.onInsert) {
    this.eventhandlers.push(["#"+elt.id,"insert",elt.onInsert]);
  }

  //console.log("elt",elt);

  var eltstr = _template(elt.template)({'elt': elt, 'schema': schema, 'escape': escapeHTML});

  this.html+=eltstr;

};


formFragment.prototype.walkElementsInSchema = function(schema, options,prefix) {

  _.each(schema.properties, function(prop, key) {
    if (prop.properties) {
      this.walkElementsInSchema(prop,options,prefix+key+".");
    } else {
      this.buildOneElement({'key':prefix+key},options);
    }
  },this);
};

formFragment.prototype.build = function(options) {

//  options = JSON.parse(JSON.stringify(options));

  // options.schema   = options
  // options.form = string if we want to add elements defined in the schema 
  //                    OR object describing a new kind of element not available in options.schema

  // JSON schema shorthand
  if (options.schema && !options.schema.properties) {
    options.schema = {properties: options.schema};
  }

  _.each(options.form, function(elt) {

    //Shorthand for adding every field in the schema automatically.
    if (elt === '*') {
      this.walkElementsInSchema(options.schema,options,"");
      return;
    }

    if (_.isString(elt)) {
      elt = {
        'key': elt
      };
    }

    this.buildOneElement(elt,options);

  },this);

};

jsonform.getFormValue = function(formelt) {
  var formArray = $(formelt).serializeArray();

  var formSchema = $(formelt).data("jsonform-schema");

  var values = {};
  for (var i = 0; i < formArray.length; i++) {
    var eltSchema = getSchemaKey(formSchema.properties, formArray[i].name);

    if (!eltSchema) continue;

    //type casting
    if (eltSchema.type=="boolean") {
      formArray[i].value = !!formArray[i].value;
    }
    if (eltSchema.type=="object" && (typeof formArray[i].value=="string") && formArray[i].value.substring(0,1)=="{") {
      try {
        formArray[i].value = JSON.parse(formArray[i].value);
      } catch (e) {
        formArray[i].value = {};
      }
    }


    if (formArray[i].name) {
      setObjKey(values, formArray[i].name, formArray[i].value);
    }
  }
  return values;
};

$.fn.jsonForm = function(options) {
  var formElt = this;

  var form = new formFragment();

  form.build(options);

  if (options.transloadit) {
    form.html+='<input type="hidden" name="params" value=\''+escapeHTML(JSON.stringify(options.transloadit.params))+'\'>';
  }

  formElt.append(form.html);

  formElt.data("jsonform-schema",options.schema);

  formElt.unbind((options.submitEvent||'submit')+'.jsonform');

  //console.log("bind",form.eventhandlers);
  for (var i=0;i<form.eventhandlers.length;i++) {
    var target = $(form.eventhandlers[i][0].replace(/\./g,"\\."));
    if (form.eventhandlers[i][1]=="insert") {
      form.eventhandlers[i][2]({"target":target});
    } else {
      target.bind(form.eventhandlers[i][1],form.eventhandlers[i][2]);
    }
  }

  //return true=stop event
  var realSubmit = function(error,values) {
    if (options.onSubmit) {
      return options.onSubmit(error,values);
    }
    return true;
  };

  formElt.bind((options.submitEvent||'submit')+'.jsonform', function(event) {
    var value = jsonform.getFormValue(this);
    var stopEvent = false;

    //When there's no transloadit or none submitted, skip transloadit support
    if (!options.transloadit || !$("input[type=file]",formElt).val()) {
      stopEvent = !realSubmit(null,value);

    //transloadit already bound?
    } else if (formElt.data("transloadit.uploader")) {
      stopEvent = !realSubmit(null,value);

    } else {
      //console.log("transload setup");

      formElt.transloadit({
        autoSubmit:false,
        wait:true,
        onSuccess:function(assembly) {
          console.log("assembly done",assembly);
          
          //howto multifield?
          if (assembly.results[":original"]) {
            value["icon"] = assembly.results[":original"][0];
          }
          realSubmit(null,value);
          
          //unbind
          formElt.data("transloadit.uploader","");
          formElt.unbind("submit.transloadit");

        },
        //debug:false,
        onError:function(assembly) {
          console.log("Assembly error",assembly);
        }
      });

      //replace jsonform's submit
      formElt.unbind("submit.jsonform");
      formElt.submit();

      stopEvent=true;
    }

    if (stopEvent) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
  
};

$.fn.jsonFormValue = function() {
  return jsonform.getFormValue(this);
};

window.JSONForm = jsonform;

})(jQuery, _, JSON);