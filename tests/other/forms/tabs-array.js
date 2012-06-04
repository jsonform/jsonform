$("#testform").jsonForm({
  "schema": {
    "datasources": {
      "type": "object",
      "properties": {
        "ds1": {
          "type": "array",
          "title": "ds1",
          "items": {
            "type": "string"
          }
        },
        "ds2": {
          "type": "array",
          "title": "ds2",
          "items": {
            "type": "string"
          }
        },
        "ds3": {
          "type": "array",
          "title": "ds1",
          "items": {
            "type": "string"
          }
        }
      }
    }
  },
  "form": [
    {
      "type": "tabarray",
      "items": [
        {
          "type": "tabfieldset",
          "legend": "Entry XXXidxXXX",
          "items": [
            {
              "key": "datasources.ds1[]",
              "title": "First ds XXXidxXXX"
            },
            "datasources.ds2[]",
            "datasources.ds3[]"
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
  "value": {
    "datasources": {
      "ds1": [
        "toto",
        "tutu"
      ],
      "ds2": [
        null,
        "truc"
      ],
      "ds3": [
        "blah"
      ]
    }
  },
  "onSubmit": function (errors,values) {
    console.log(errors,values);
  }
});