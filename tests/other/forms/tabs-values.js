$("#testform").jsonForm({
  "schema": {
    "user": {
      "title": "Username",
      "type": "string"
    },
    "search": {
      "title": "Search text",
      "type": "string"
    }
  },
  "form": [
    {
      "type": "selectfieldset",
      "title": "Search by",
      "items": [
        {
          "type": "optionfieldset",
          "legend": "Username",
          "items": [
            "user"
          ]
        },
        {
          "type": "optionfieldset",
          "legend": "String",
          "items": [
            {
              "key": "search"
            }
          ]
        }
      ]
    }
  ],
  "value": {
    "search": "youpi"
  },
  "onSubmit": function (errors,values) {
    console.log(errors,values);
  }
});