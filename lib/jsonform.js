(function($,_) {
	

var defaultTemplates = {
	'text':'<div class="clearfix"><% if (schema.title) { %><label for=""><%= schema.title %></label><% } %><div class="input"><input class="xlarge" type="text" name="<%= name %>" /><% if (schema.description) { %><span class="help-inline"><%= schema.description %></span><% } %></div></div>',
	'fieldset':'<fieldset><legend><%= legend %></legend><%= itemshtml %></fieldset>',
	'submit':'<input type="submit" class="btn primary" value="OK"/>',
	'actions':'<div class="actions"><%= itemshtml %></div>'
};

var buildForm = function(options) {
	
	var str = "";

	_.each(options.elements,function(elt) {
		
		if (_.isString(elt)) {
			elt = {
				"key":elt
			};
		}

		var schema = {};
		if (elt.key) {
			schema = options.schema.properties[elt.key];

			if (!schema) {
				throw new Error(elt.key+" has no schema");	
			}
		}

		if (!elt.type) {
			if (schema.type=="number" || schema.type=="string") {
				elt.type = "text";
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

		elt.schema = _.clone(schema);
		var eltstr = _.template(elt.template)(elt);

		str += eltstr;

	});

	return str;

};


$.fn.jsonForm = function(options) {
	this.append(buildForm(options));
};

})(jQuery,_);