$("#testform").jsonForm({
  "schema": {
    "simplearray": {
      "title": "A simple array",
      "type": "array",
      "items": {
        "title": "Array item",
        "type": "string"
      }
    },
    "arraykey": {
      "title": "An array referenced through a key",
      "type": "array",
      "items": {
        "title": "Element",
        "type": "string"
      }
    },
    "arrayarray": {
      "title": "An array whose item types are defined in an array",
      "type": "array",
      "items": [
        {
          "title": "Element",
          "type": "string"
        }
      ]
    },
    "arrayarraylayout": {
      "title": "An array whose item types are defined in an array whose layout is given",
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "key1": {
              "title": "Key 1",
              "type": "string"
            },
            "key2": {
              "title": "Key 2",
              "type": "string"
            }
          }
        }
      ]
    },
    "selectme": {
      "title": "A list of values",
      "type": "array",
      "items": {
        "title": "Possible values",
        "type": "string",
        "enum": [
          "blah",
          "foo",
          "bar",
          "baz"
        ]
      }
    },
    "quizzes": {
      "title": "Quizzes metadata",
      "type": "array",
      "items": {
        "type": "object",
        "title": "A Quiz",
        "properties": {
          "desc": {
            "title": "Description",
            "description": "Short description of the quiz",
            "type": "string"
          },
          "image": {
            "title": "Image",
            "description": "URL of the quiz image. Image should be a square, 200x200 at least",
            "type": "string"
          }
        }
      }
    },
    "pictures": {
      "title": "Pictures metadata",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "desc": {
            "title": "Description",
            "description": "Short description of the pictures",
            "type": "string"
          },
          "thumbnail": {
            "title": "Thumbnail",
            "description": "URL of the thumbnail of the picture",
            "type": "string",
            "required": true
          }
        }
      }
    },
    "happy": {
      "title": "Are you happy?",
      "type": "string",
      "enum": [
        "yes",
        "no"
      ]
    },
    "enums": {
      "title": "onChange in an array",
      "type": "array",
      "items": [
        {
          "type": "string",
          "enum": [
            "toto",
            "tutu"
          ]
        }
      ]
    }
  },
  "form": [
    "simplearray",
    {
      "type": "array",
      "key": "arraykey"
    },
    "arrayarray",
    {
      "type": "array",
      "items": {
        "type": "fieldset",
        "legend": "Keys",
        "items": [
          "arrayarraylayout[].key1",
          "arrayarraylayout[].key2"
        ]
      }
    },
    {
      "type": "checkboxes",
      "title": "Select me",
      "key": "selectme"
    },
    "quizzes",
    {
      "type": "array",
      "title": "Pictures",
      "items": [
        {
          "type": "fieldset",
          "legend": "Picture XXXidxXXX",
          "items": [
            "pictures[].desc",
            "pictures[].thumbnail"
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
    },
    {
      "type": "array",
      "title": "onChange in an array",
      "items": [
        {
          "key": "enums[]",
          "title": "Enum number XXXidxXXX",
          "onChange": function () {
            alert('turlututu');
          }
        }
      ]
    }
  ],
  "value": {
    "enums": [
      "toto",
      "tutu"
    ]
  },
  "onSubmit": function (errors,values) {
    console.log(errors,values);
  }
});