$("#testform").jsonForm({
  "prefix": "idefix",
  "schema": {
    "user": {
      "title": "Username",
      "type": "string",
      "default": "toto"
    },
    "search": {
      "title": "Search text",
      "type": "string",
      "default": "Joshfire",
      "required": true
    },
    "array": {
      "type": "array",
      "required": true,
      "items": [
        {
          "type": "string"
        }
      ]
    },
    "object": {
      "type": "object",
      "required": true,
      "properties": {
        "child": {
          "type": "string"
        }
      }
    },
    "string": {
      "type": "string",
      "required": true
    },
    "boolean": {
      "type": "boolean",
      "required": true
    },
    "any": {
      "type": "any",
      "required": true
    },
    "notincluded": {
      "type": "string"
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
    return false;
  }
});