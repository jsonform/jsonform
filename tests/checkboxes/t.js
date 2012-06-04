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
  }
];
