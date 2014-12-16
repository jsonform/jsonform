$("#testform").jsonForm({
  "schema": {
    "tabs": {
      "type": "array",
      "items": [{
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "title": "Tab title"
          },
          "thumbnail": {
            "type": "array",
            "title": "Tab thumbnails",
            "items": {
              "type": "string"
            }
          }
        }
      }]
    }
  },
  "form": [
    {
      "type": "tabarray",
      "items": [
        {
          "type": "fieldset",
          "legend": "{{idx}}",
          "items": [
            "tabs[].name"
          ]
        }
      ]
    },
    {
      "type": "actions",
      "items": [
        {
          "type": "submit",
          "value": "Submit"
        }
      ]
    }
  ],
  "onSubmit": function (errors,values) {
    console.log(errors,values);
  }
});