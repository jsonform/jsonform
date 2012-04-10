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
    },
    {
      "type": "advancedfieldset",
      "items": [
        {
          "template": "<p>This text should belong to an \"Advanced options\" expandable section.</p>"
        }
      ]
    },
    {
      "type": "authfieldset",
      "items": [
        {
          "template": "<p>This text should belong to an \"Authentication settings\" expandable section.</p>"
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