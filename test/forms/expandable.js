$("#testform").jsonForm({
  "schema": {
    "happy": {
      "title": "Are you happy?",
      "type": "string",
      "enum": [
        "yes",
        "no"
      ]
    },
    "search": {
      "title": "Search text",
      "type": "string"
    },
    "clientkey": {
      "title": "Client key",
      "type": "string"
    },
    "clientside": {
      "title": "Run clientside",
      "type": "boolean"
    }
  },
  "form": [
    "happy",
    "search",
    {
      "type": "fieldset",
      "legend": "Advanced settings",
      "expandable": true,
      "items": [
        "clientkey",
        "clientside"
      ]
    }
  ],
  "onSubmit": function (errors,values) {
    console.log(errors,values);
  }
});