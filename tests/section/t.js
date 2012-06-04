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
          type: 'section',
          title: 'Section that contains fields',
          items: [
            'text',
            'nb'
          ]
        }
      ]
    }
  },
  {
    name: 'tabarray',
    jsonform: {
      schema: {
        arr: {
          type: 'array',
          title: 'An array',
          items: {
            type: 'object',
            title: 'Array item',
            properties: {
              name: {
                type: 'string',
                title: 'Name'
              },
              age: {
                type: 'number',
                title: 'Age'
              }
            }
          }
        }
      },
      form: [
        {
          type: 'tabarray',
          items: [
            {
              type: 'section',
              title: 'Number {{idx}}',
              items: [
                {
                  key: 'arr[].name',
                  title: 'Name'
                },
                {
                  key: 'arr[].age',
                  title: 'Age'
                }
              ]
            }
          ]
        }
      ]
    }
  }
];
