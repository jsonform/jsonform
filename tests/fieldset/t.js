var tests = [
  {
    name: 'minimal',
    jsonform: {
      schema: {
        text: {
          type: 'string',
          title: 'Text field'
        },
        nb: {
          type: 'number',
          title: 'Number'
        }
      },
      form: [
        {
          type: 'fieldset',
          title: 'Group of input fields',
          items: [
            'text',
            'nb'
          ]
        }
      ]
    }
  },
  {
    name: 'multiple',
    jsonform: {
      schema: {
        text: {
          type: 'string',
          title: 'Text field'
        },
        nb: {
          type: 'number',
          title: 'Number'
        }
      },
      form: [
        {
          type: 'fieldset',
          title: 'First group',
          items: 'text'
        },
        {
          type: 'fieldset',
          title: 'Second group',
          items: [
            'nb'
          ]
        }
      ]
    }
  },
  {
    name: 'advanced',
    jsonform: {
      schema: {
        text: {
          type: 'string',
          title: 'Text field'
        },
        nb: {
          type: 'number',
          title: 'Number'
        }
      },
      form: [
        {
          type: 'advancedfieldset',
          items: [
            'text',
            'nb'
          ]
        }
      ]
    }
  },
  {
    name: 'auth',
    jsonform: {
      schema: {
        text: {
          type: 'string',
          title: 'Text field'
        },
        nb: {
          type: 'number',
          title: 'Number'
        }
      },
      form: [
        {
          type: 'authfieldset',
          items: [
            'text',
            'nb'
          ]
        }
      ]
    }
  },
  {
    name: 'expandable',
    jsonform: {
      "schema": {
        "comment": {
          "type": "string",
          "title": "Comment"
        },
        "name": {
          "type": "string",
          "title": "Name"
        },
        "age": {
          "type": "number",
          "title": "Age"
        }
      },
      "form": [
        {
          "key": "comment",
          "type": "textarea"
        },
        {
          "type": "fieldset",
          "title": "Author",
          "expandable": true,
          "items": [
            "name",
            "age"
          ]
        }
      ]
    }
  }
];
