var tests = [
  {
    name: 'minimal',
    jsonform: {
      schema: {
        opt: {
          type: 'array',
          title: 'Options',
          uniqueItems: true,
          items: {
            type: 'string',
            title: 'Option',
            'enum': [ 'one', 'two', 'three' ]
          }
        }
      },
      form: [
        {
          key: 'opt',
          type: 'checkboxes'
        }
      ]
    }
  },
  {
    name: 'default',
    jsonform: {
      schema: {
        opt: {
          type: 'array',
          title: 'Options',
          uniqueItems: true,
          items: {
            type: 'string',
            title: 'Option',
            'enum': [ 'one', 'two', 'three' ]
          },
          'default': [ 'one', 'three' ],
          minItems: 2
        }
      },
      form: [
        {
          key: 'opt',
          type: 'checkboxes'
        }
      ]
    }
  },
  {
    name: 'titleMap',
    jsonform: {
      "schema": {
        "menu": {
          "type": "array",
          "title": "Options",
          "items": {
            "type": "string",
            "title": "Option",
            "enum": [
              "starter",
              "maincourse",
              "cheese",
              "dessert"
            ]
          }
        }
      },
      "form": [
        {
          "key": "menu",
          "type": "checkboxes",
          "titleMap": {
            "starter": "I'd like a starter",
            "maincourse": "Thumbs up for a main course",
            "cheese": "Cheddar rules!",
            "dessert": "I'll take some dessert, of course"
          }
        }
      ]
    }
  }
];
