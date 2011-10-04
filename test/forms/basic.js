

$("#testform").jsonForm({
	"schema":{
        "name":"Product",
        "properties":
        {
                "id":
                {
                        "type":"number",
                        "title":"Identifier",
                        "description":"Enter a valid product identifier",
                        "required":true
                },
                "name":
                {
                        "title":"Name of the product",
                        "type":"string",
                        "required":true
                },
                "price":
                {
                        "type":"number",
                        "minimum":0,
                        "required":true
                }/*,
                "tags":
                {
                        "type":"array",
                        "items":
                        {
                                "type":"string"
                        }
                }*/
        }
	},
	"elements":[
		{
			"key":"id",
			"onBlur":function() {
				alert();
			}
		},
		{
			"type":"fieldset",
			"items":[
				"name"

			]
		},
		"price",
		{
			"type":"submit"
		}

	],
	"onSubmit":function(values) {
		
	}
	
});

