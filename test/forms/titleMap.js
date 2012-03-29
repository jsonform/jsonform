$("#testform").jsonForm({
  "schema": {
    "opts": {
      "type": "array",
      "title": "Options",
      "uniqueItems": true,
      "items": {
        "type": "string",
        "enum": [
          "one",
          "two",
          "three"
        ]
      },
      "default": [
        "two",
        "three"],
      "minItems": 2
    },
    "gender": {
      "type": "string",
      "title": "Gender",
      "enum": [
        "male",
        "female"
      ]
    }
  },
  "form": [
    {
      "key": "opts",
      "type": "checkboxes",
      "titleMap": {
        "one": "1. One",
        "two": "2. Two",
        "three": "3. Three"
      }
    },
    {
      "key": "gender",
      "titleMap": {
        "male": "Man",
        "female": "Woman"
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