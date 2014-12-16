$("#testform").jsonForm({
  "schema": {
    "check1": {
      "type": "boolean",
      "title": "Check 1",
      "default": false
    },
    "check2": {
      "type": "boolean",
      "title": "Check 2",
      "default": true
    },
    "check3": {
      "type": "boolean",
      "title": "Check 3",
      "default": true
    }
  },
  "form": [
    {
      "key": "check1",
      "inlinetitle": "Checkbox is not checked by default"
    },
    {
      "type": "selectfieldset",
      "items": [
        {
          "type": "optionfieldset",
          "legend": "One option",
          "items": [
            {
              "key": "check2",
              "inlinetitle": "Checkbox is checked by default but value is false"
            }
          ]
        },
        {
          "type": "optionfieldset",
          "legend": "Another option",
          "items": [
            {
              "key": "check3",
              "inlinetitle": "Checkbox is checked by default and value is undefined"
            }
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
  },
  "onSubmit": function (errors,values) {
    console.log(errors, JSON.stringify(values, null, 2));
  }
});