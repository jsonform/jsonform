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
      },
      "gender":{
        "type":"string",
        "enum":["male","female"]
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
  "value":{
    "price":42
  },
  "elements":[

    {
      "type":"fieldset",
      "legend":"Test legend",
      "items":[
        "id",
        {
          "key":"name",
          "type":"textarea",
          "value":"ok",
          "onBlur":function() {
            alert();
          }
        }

      ]
    },
    
    "gender",
    "price",
    {
      "type":"actions",
      "items":[
        {
          "type":"submit"
        }
      ]
    }

  ],
  "onSubmit":function(values) {}
});