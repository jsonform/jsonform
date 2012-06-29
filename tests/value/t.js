var tests = [
  {
    name: 'minimal',
    jsonform: {
      schema: {
        first: {
          type: 'string',
          title: 'First field',
          description: 'The initial value should be that of the second field',
          'default': '{{value second}}'
        },
        second: {
          type: 'string',
          title: 'Second field',
          'default': 'Hello copycat'
        }
      }
    }
  },
  {
    name: 'using value',
    jsonform: {
      schema: {
        first: {
          type: 'string',
          title: 'First field',
          description: 'The initial value should be that of the second field',
          'default': 'This first value should not appear'
        },
        second: {
          type: 'string',
          title: 'Second field',
          'default': 'This second value should not appear'
        }
      },
      form: [
        {
          key: 'first',
          value: '{{value second}}'
        },
        {
          key: 'second',
          value: 'Hello copycat'
        }
      ]
    }
  },
  {
    name: 'array',
    jsonform: {
      schema: {
        thoughts: {
          type: 'array',
          title: 'Thoughts',
          items: {
            type: 'object',
            title: 'A thought',
            properties: {
              label: {
                type: 'string',
                title: 'Label',
                'default': 'Great thought {{idx}}'
              },
              desc: {
                type: 'string',
                title: 'Description'
              }
            }
          }
        }
      },
      form: [
        {
          type: 'array',
          items: [{
            type: 'section',
            items: [
              {
                key: 'thoughts[].label'
              },
              {
                key: 'thoughts[].desc',
                value: '{{value thoughts[].label}}\'s description'
              }
            ]
          }]
        }
      ]
    }
  },
  {
    name: 'tabarray',
    jsonform: {
      schema: {
        thoughts: {
          type: 'array',
          title: 'Thoughts',
          items: {
            type: 'object',
            title: 'A thought',
            properties: {
              label: {
                type: 'string',
                title: 'Label',
                'default': 'Great thought {{idx}}'
              },
              desc: {
                type: 'string',
                title: 'Description'
              }
            }
          }
        }
      },
      form: [
        {
          type: 'tabarray',
          items: [{
            type: 'section',
            legend: '{{idx}}. {{value}}',
            items: [
              {
                key: 'thoughts[].label'
              },
              {
                key: 'thoughts[].desc',
                value: '{{value thoughts[].label}}\'s description',
                valueInLegend: true
              }
            ]
          }]
        }
      ]
    }
  },
  {
    name: 'enum',
    jsonform: {
      schema: {
        first: {
          type: 'string',
          title: 'First field',
          description: 'The initial value should be that of the second field',
          'default': 'This first value should not appear'
        },
        second: {
          type: 'string',
          title: 'Second field',
          'enum': [
            'c1',
            'c2',
            'c3'
          ],
          'default': 'c2'
        }
      },
      form: [
        {
          key: 'first',
          value: '{{value second}}'
        },
        {
          key: 'second',
          titleMap: {
            'c1': 'Choice 1',
            'c2': 'Choice 2',
            'c3': 'Choice 3'
          }
        }
      ]
    }
  },
];
