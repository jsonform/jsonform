$("#testform").jsonForm({
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

  ],
  "onSubmit":function(values) {
    
  }
  
});

