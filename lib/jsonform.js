(function($,_) {
	

var defaultTemplates = {
	'text':'<input type="text" name="<%= name %>" />',
	'fieldset':'<fieldset><%= itemshtml %></fieldset>',
	'submit':'<input type="submit" value="OK"/>'
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

		var eltstr = _.template(elt.template)(elt);

		str += eltstr;

	});

	return str;

};


$.fn.jsonForm = function(options) {
	this.append(buildForm(options));
};

})(jQuery,_);