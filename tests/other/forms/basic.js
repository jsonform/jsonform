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
        "maxLength":20,
        "required":true
      },
      "shortname":
      {
        "title":"short name",
        "type":"string",
        "required":true
      },
      "price":
      {
        "type":"number",
        "minimum":10,
        "required":true
      },
      "opts":
      {
          "type":"array",
          "title":"Options",
          "uniqueItems":true,
          "items":{
            "type":"string",
            "enum":["one","two","three"]
          },
          "default":["two","three"],
          "minItems":2
      },
      "gender":{
        "type":"string",
        "enum":["male", "female"]
      },
      "flag": {
        "type": "boolean"
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
    {
      "key":"shortname",
      "allowEmpty":true
    },
    "gender",
    "price",
    "flag",
    {
      "key":"opts",
      "type":"checkboxes",
      "titleMap":{
        "one":"1. One",
        "two":"2. Two",
        "three":"3. Three"
      }
    },
    {
      "type":"actions",
      "items":[
        {
          "type":"submit",
          "value":"OK"
        }
      ]
    }
  ],
  "onSubmit": function(errors,values) {
    console.log(errors,values);
  }
});