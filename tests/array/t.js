var tests = [
  {
    name: 'minimal',
    jsonform: {
      schema: {
        arr: {
          type: 'array',
          title: 'An array',
          items: {
            type: 'string',
            title: 'Array item'
          }
        }
      }
    }
  },
  {
    name: 'simple form',
    jsonform: {
      schema: {
        arr: {
          type: 'array',
          title: 'An array',
          items: {
            type: 'string',
            title: 'Array item'
          }
        }
      },
      form: [
        {
          type: 'array',
          items: [
            {
              type: 'fieldset',
              title: 'Great array item',
              items: [
                'arr[]'
              ]
            }
          ]
        }
      ]
    }
  },
  {
    name: 'Using index',
    jsonform: {
      schema: {
        arr: {
          type: 'array',
          title: 'An array',
          items: {
            type: 'string',
            title: 'Array item'
          }
        }
      },
      form: [
        {
          type: 'array',
          items: [
            {
              type: 'fieldset',
              title: 'Number {{idx}}',
              items: [
                {
                  key: 'arr[]',
                  title: 'Item {{idx}}'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    name: 'Default value',
    jsonform: {
      schema: {
        arr: {
          type: 'array',
          title: 'An array',
          items: {
            type: 'string',
            title: 'Array item',
            'default': 'Hey dude'
          }
        }
      },
      form: [
        {
          type: 'array',
          items: [
            {
              type: 'fieldset',
              title: 'Number {{idx}}',
              items: [
                {
                  key: 'arr[]',
                  title: 'Item {{idx}}'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    name: 'Default array',
    jsonform: {
      schema: {
        arr: {
          type: 'array',
          title: 'An array',
          items: {
            type: 'string',
            title: 'Array item'
          },
          'default': [
            'Hey',
            'dude'
          ]
        }
      }
    }
  },
  {
    name: 'Value as legend',
    jsonform: {
      schema: {
        arr: {
          type: 'array',
          title: 'An array',
          items: {
            type: 'string',
            title: 'Array item',
            maxLength: 15
          }
        }
      },
      form: [
        {
          type: 'array',
          items: [
            {
              type: 'fieldset',
              title: 'Number {{idx}}',
              legend: '{{idx}}. {{value}}',
              items: [
                {
                  key: 'arr[]',
                  title: 'Item {{idx}}',
                  value: 'Hello number {{idx}}',
                  valueInLegend: true
                }
              ]
            }
          ]
        }
      ]
    }
  }
];
