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
        "enum":["male", "female"]
      }
    }
  },
  "value":{
    "price": 42,
    "gender": "female"
  },
  "form":[
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
  "onSubmit": function(values) {}
});