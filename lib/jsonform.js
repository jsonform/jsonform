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
jsonform.fieldTemplate = function(inner) {
  return '<div class="clearfix jsonform-error-<%= elt.keydash %>">'+
          '<label for="<%= elt.id %>"><% if (!elt.notitle) { %><%= elt.title || schema.title %><% } %></label>'+
            '<div class="input <% if (elt.prepend) { %>input-prepend<% } %> <% if (elt.append) { %>input-append<% } %>">'+
            '<% if (elt.prepend) { %><label class="add-on"><%= elt.prepend %></label><% } %>'+
            inner+
            '<% if (elt.append) { %><label class="add-on"><%= elt.append %></label><% } %>'+
            '<% if (schema.description) { %><span class="help-inline"><%= schema.description %></span><% } %>'+
            '<span class="help-block jsonform-errortext" style="display:none;"></span>'+
          '</div></div>';
};

var fileDisplayTemplate = '<% if (elt.value.type=="image") { %><img id="jsonformpreview-<%= elt.id %>" src="<%= elt.value.url %>" /><% } else { %><a href="<%= elt.value.url %>"><%= elt.value.name %></a> (<%= Math.ceil(elt.value.size/1024) %>kB)<% } %><br/>';

jsonform.elementTypes = {
  'text':{
    'template':'<input class="xlarge" type="text" name="<%= elt.name %>" value="<%= escape(elt.value) %>" id="<%= elt.id %>" />',
    'fieldtemplate':true
  },
  'password':{
    'template':'<input class="xlarge" type="password" name="<%= elt.name %>" value="<%= escape(elt.value) %>" id="<%= elt.id %>" />',
    'fieldtemplate':true
  },
  'textarea':{
    'template':'<textarea id="<%= elt.id %>" name="<%= elt.name %>"><%= elt.value %></textarea>',
    'fieldtemplate':true
  },
  'checkbox':{
    'template':'<ul class="inputs-list"><li><label><input type="checkbox" id="<%= elt.id %>" name="<%= elt.name %>" value="1" <% if (elt.value) {%>checked<% } %> /><span><%= elt.inlinetitle %></span></label></li></ul>',
    'fieldtemplate':true
  },
  'file':{
    'template':'<input class="input-file" id="<%= elt.id %>" name="<%= elt.name %>" type="file" />',
    'fieldtemplate':true
  },
  'file-transloadit':{
    'template':'<% if (elt.value) { %>'+fileDisplayTemplate+'<% } %><input id="<%= elt.id %>" type="file" name="_transloadit_<%= elt.name %>" /><input type="hidden" id="<%= elt.id %>" name="<%= elt.name %>" value=\'<%= escape(JSON.stringify(elt.value)) %>\' />',
    'fieldtemplate':true
  },
  'select':{
    'template':'<select name="<%= elt.name %>" id="<%= elt.id %>"><% _.each(elt.options, function(key, val) { if (elt.value == key) { %><option selected value="<%= key %>"><%= key %></option><% } else{ %><option value="<%= key %>"><%= key %></option><%}}); %></select>',
    'fieldtemplate':true
  },
  'radios':{
    'template':'<ul class="inputs-list" id="<%= elt.id %>"><% _.each(elt.options, function(key, val) { %> <li><label><input type="radio" <% if (elt.value == key) { %> checked="checked" <% } %> name="<%= elt.name %>" value="<%= key %>"><span><%= key %></span></label></li> <% }); %></ul>',
    'fieldtemplate':true
  },
  'checkboxesitem':{
    'template':'<li><label><input type="checkbox" <% if (elt.value) { %> checked="checked" <% } %> name="<%= elt.name %>" value="1"><span><%= elt.title || schema.title %></span></label></li>'
  },
  'checkboxes':{
    'template':'<ul class="inputs-list" id="<%= elt.id %>"><%= elt.itemshtml %></ul>',
    'fieldtemplate':true
  },
  'array':{
    'template':'<ul id="<%= elt.id %>" class="_jsonform-array-ul" style="list-style-type:none;"><%= elt.itemshtml %></ul><span class="_jsonform-array-buttons"><a href="#" class="_jsonform-array-addmore">Add more</a> | <a href="#"  class="_jsonform-array-deletelast">Delete last</a></span>',
    'fieldtemplate':true
  },
  'help':{
    'template':'<span class="help-block" style="padding-top:5px"><%= elt.helpvalue %></span>',
    'fieldtemplate':true
  },
  'fieldset':{
    'template':'<fieldset><legend><%= elt.legend %></legend><%= elt.itemshtml %></fieldset>'
  },
  'submit':{
    'template':'<input type="submit" id="<%= elt.id %>" class="btn primary" value="<%= elt.value %>"/>'
  },
  'button':{
    'template':'<button id="<%= elt.id %>" class="btn"><%= elt.title %></button>'
  },
  'actions':{
    'template':'<div class="actions"><%= elt.itemshtml %></div>'
  },
  'hidden':{
    'template':'<input type="hidden" id="<%= elt.id %>"  name="<%= elt.name %>" value="<%= escape(elt.value) %>" />'
  }
};

/*
Legacy elements:

'file-jquery-multiple': jsonform.defaultFieldTemplate('<div id="<%= elt.id %>"><div class="fileupload-buttonbar"><label class="fileinput-button"><span>Add files...</span><input type="file" name="<%= elt.name %>" multiple></label><button type="submit" class="start">Start upload</button><button type="reset" class="cancel">Cancel upload</button><button type="button" class="delete">Delete files</button></div><div class="fileupload-content"><table class="files"></table><div class="fileupload-progressbar"></div></div></div>'),
*/

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

  //we re-set a lot of properties (name, id, value) =>
  //make a copy of the element so that we don't pollute the original object too much
  //todo, won't for for embedded objects (but we can't use JSON to do a deep copy because
  //of the event handlers!)
  elt = _.clone(elt);

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
    if ((typeof elt.value)=="undefined" && schema['default']) {
      elt.value = schema['default'];
    }


    //Plug custom behaviours
    if (options.onElementValue) {
      options.onElementValue(elt,schema);
    }

    elt.keydash = elt.key.replace(/\./g,"---");
  }

  elt.iddot = (elt.id||"").replace(/\./g,"\\.");
  

  if (!elt.type) {
    if ((schema.type == 'number' || schema.type == 'string') && !schema['enum']) {
      elt.type = 'text';
    } else if (schema.type=='boolean') {
      elt.type = 'checkbox';
    } else if (typeof schema['enum'] != 'undefined') {
      elt.type = 'select';
    } else if (schema.type=='array') {
      elt.type = 'array';
    }
  }

  if (typeof schema['enum'] != 'undefined' && !elt.options) {
    elt.options = schema['enum'];
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

  // Very special case when the schema is an array :
  // We add a special meta-element that can include any number of sub-elements
  // They are added one by one by the user at runtime
  if (schema.items && schema.type=="array") {

    var genSubElementFormWithValue = function(v,elt,i) {
      var suboptions = _.clone(options);
      _.extend(suboptions,{
        "schema":{"XXXkeyXXX":schema.items},
        "value":{"XXXkeyXXX":v},
        "form":[{
          "key":"XXXkeyXXX",
          "parentKey":elt.key //To be able to do custom handlers on child elements
        }]
      });
      var subForm = new formFragment();
      subForm.build(suboptions);
      if (i>=0) elt.itemshtml += "<li>"+subForm.html.replace(/XXXkeyXXX/g,elt.key+"["+i+"]")+"</li>";
      
      return subForm;
    };

    //Display at least one first element
    if (!elt.value || !elt.value.length) {
      elt.value = [undefined];
    }
    elt.itemshtml="";

    for (var i=0;i<elt.value.length;i++) {      
      genSubElementFormWithValue(elt.value[i],elt,i);
    }
    
    //We always need to generate a blank template for being able to add new elements
    var subFormTpl = genSubElementFormWithValue(undefined,elt,-1);

    elt.itemshtmltpl = subFormTpl.html;

    //TODO move all this alongside the template declaration
    this.eventhandlers.push(["#"+elt.id,"insert",function() {
      
      var addMore = function(newNo) {
        if (newNo==-1) {
          newNo = $("#"+elt.iddot).children().size();
          $("#"+elt.iddot).append("<li>"+elt.itemshtmltpl.replace(/XXXkeyXXX/g,elt.key+"["+newNo+"]")+"</li>");
        }

        //Bind each sub-event handler
        _.each(subFormTpl.eventhandlers,function(subhandler) {

          var newId = subhandler[0].replace(/XXXkeyXXX/g,elt.key+"["+newNo+"]").substring(1);
          $(document.getElementById(newId)).bind(subhandler[1],subhandler[2]);
        });
        
      };

      $("a._jsonform-array-deletelast",$("#"+elt.iddot).parent()).click(function(evt) {
        $("#"+elt.iddot).children().last().remove(); 
        evt.preventDefault();
      });

      $("a._jsonform-array-addmore",$("#"+elt.iddot).parent()).click(function(evt) {
        addMore(-1);
        evt.preventDefault();
      });

      //Add handlers to existing elements
      for (var i=0;i<elt.value.length;i++) {
        addMore(i);
      }

    }]);
      
  }

  if (!elt.template) {
    elt.template = jsonform.elementTypes[elt.type].template;
    if (jsonform.elementTypes[elt.type].fieldtemplate) {
      elt.template = jsonform.fieldTemplate(elt.template);
    }
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

  // console.log("elt",elt);

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

    var eltSchema;

    //Is the element part of an array?
    var arrayMatch = formArray[i].name.match(/\[([0-9]+)\]$/);
    if (arrayMatch) {

      var name = formArray[i].name.replace(/\[([0-9]+)\]$/,"");
      eltSchema = getSchemaKey(formSchema.properties, name);

      //false alert
      if (eltSchema.type!="array") { 
        eltSchema=false;

      //Update that value in the existing value array.
      } else {
        eltSchema = eltSchema.items;
        var val = getObjKey(values, name) || [];
        val[parseInt(arrayMatch[1],10)] = formArray[i].value;
        setObjKey(values, name, val);
        continue;
      }

      if (!eltSchema) {
        eltSchema = getSchemaKey(formSchema.properties, formArray[i].name);
      }
    } else {
      eltSchema = getSchemaKey(formSchema.properties, formArray[i].name);
    }
    
    if (!eltSchema) continue;

    //type casting
    if (eltSchema.type=="boolean") {
      if (formArray[i].value==="0") {
        formArray[i].value = false;
      } else {
        formArray[i].value = !!formArray[i].value;
      }
    }
    if (eltSchema.type=="number") {
      if (typeof formArray[i].value=="string") {
        if (!formArray[i].value.length) {
          formArray[i].value = undefined;
        } else if (!isNaN(Number(formArray[i].value))) {
          formArray[i].value = Number(formArray[i].value);
        }
      }
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
  // console.log("Form value",values);
  return values;
};

$.fn.jsonFormErrors = function(errors,options) {
  $(".error",this).removeClass("error");
  $(".jsonform-errortext",this).hide();
  if (!errors) return;
  for (var i=0;i<errors.length;i++) {
    
    var key = errors[i].uri.replace(/.*#\//,"").replace(/\//g,".");
    var errormarkerclass = ".jsonform-error-"+key.replace(/\./g,"---");

    $(errormarkerclass,this).addClass("error");
    $(errormarkerclass+" .jsonform-errortext",this).html(errors[i].message).show();
  }
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
  var realSubmit = function(errors,values) {

    if (options.validate!==false) {

      var validator = false;
      if (typeof options.validate!="object") {
        if (window.JSONFormValidator) {
          validator = window.JSONFormValidator.createEnvironment("json-schema-draft-03");
        }
      } else {
        validator = options.validate;
      }
      if (validator) {
        var v = validator.validate(values,options.schema);
        formElt.jsonFormErrors(false,options);
        if (v.errors.length) {
          if (!errors) errors = [];
          errors = errors.concat(v.errors);
        }
      }
    }

    if (errors) {
      if (options.displayErrors) {
        options.displayErrors(errors,formElt);
      } else {
        formElt.jsonFormErrors(errors,options);
      }
    }

    if (options.onSubmit) {
      return options.onSubmit(errors,values);
    }
    if (options.onSubmitValid) {
      if (!errors) {
        return options.onSubmitValid(values);
      } else {
        return false;
      }
    }

    return true;
  };

  formElt.bind((options.submitEvent||'submit')+'.jsonform', function(event) {
    var value = jsonform.getFormValue(this);
    var stopEvent = false;

    //TODO is there an easier way to do this w/ jQuery?
    var someInputsHaveValue=false;
    $("input[type=file]",formElt).each(function() {
      someInputsHaveValue=someInputsHaveValue||!!$(this).val();
    });

    //When there's no transloadit or none submitted, skip transloadit support
    if (!options.transloadit || !someInputsHaveValue) {
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
          //console.log("assembly done",assembly);
          
          if (assembly.results[":original"]) {
            for (var i=0;i<assembly.results[":original"].length;i++) {
              var f = assembly.results[":original"][i];
              delete value[f.field];
              setObjKey(value,f.field.replace(/^_transloadit_/,""),f);
            }
          }

          realSubmit(null,value);
          
          //unbind
          formElt.data("transloadit.uploader","");
          formElt.unbind("submit.transloadit");

        },
        //debug:false,
        onError:function(assembly) {
          //console.log("Assembly error",assembly);
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