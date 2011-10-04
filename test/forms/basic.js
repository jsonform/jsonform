$("#testform").jsonForm({
<<<<<<< HEAD
  "schema":{
    "name":"Product",
    "properties":
    {
      "id":
      {
        "type":"number",
        "description":"Product identifier",
        "required":true
      },
      "name":
      {
        "description":"Name of the product",
        "type":"string",
        "required":true
      },
      "price":
      {
        "type":"number",
        "minimum":0,
        "required":true
      },
      "gender":{
         "type":"string",
         'enum':["male","female"]
      }
      /*,
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
    "gender",
    {
      "type":"submit"
    }
=======
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
			"type":"fieldset",
			"legend":"Test legend",
			"items":[
				"name",
				{
					"key":"id",
					"onBlur":function() {
						alert();
					}
				}

			]
		},
		
		
		"price",
		{
			"type":"actions",
			"items":[
				{
					"type":"submit"
				}
			]
		}
		
>>>>>>> 92dcedf4b23bf7c5ae06f634daba547ac6c41d14

  ],
  "onSubmit":function(values) {
    
  }
  
});

