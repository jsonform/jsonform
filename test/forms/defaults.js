$("#testform").jsonForm({
  "schema": {
    "user": {
      "title": "Username",
      "type": "string",
      "required": true,
      "default": "toto"
    },
    "search": {
      "title": "Search text",
      "type": "string",
      "default": "Joshfire",
      "required": true
    }
  },
  "form": [
    "*",
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
    console.log(errors, JSON.stringify(values, null, 2));
    window.JSONForm.setDefaultValues(values, this.schema);
    console.log(errors, JSON.stringify(values, null, 2));
  }
});