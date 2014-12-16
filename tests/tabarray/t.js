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
      },
      form: [
        {
          type: 'tabarray',
          key: 'arr'
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
          type: 'tabarray',
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
    name: 'Value as legend',
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
          type: 'tabarray',
          items: [
            {
              type: 'fieldset',
              title: 'Number {{idx}}',
              legend: '{{idx}}. {{value}}',
              items: [
                {
                  key: 'arr[]',
                  title: 'Item {{idx}}',
                  valueInLegend: true
                }
              ]
            }
          ]
        }
      ]
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
          type: 'tabarray',
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
  },
  {
    name: 'Value with quote',
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
          type: 'tabarray',
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
      ],
      value: {
        arr: [
          "'bout"
        ]
      }
    }
  },
  {
    name: 'Values with null item',
    jsonform: {
      schema: {
        arr: {
          type: 'array',
          title: 'An array',
          items: {
            type: 'object',
            properties: {
              icon: {
                type: 'string',
                title: 'Icon'
              }
            },
            title: 'Array item'
          }
        }
      },
      form: [
        {
          type: 'tabarray',
          items: [
            {
              type: 'fieldset',
              title: 'Number {{idx}}',
              legend: '{{idx}}. {{value}}',
              items: [
                {
                  key: 'arr[].icon',
                  title: 'Item {{idx}}',
                  value: 'Hello number {{idx}}',
                  valueInLegend: true
                }
              ]
            }
          ]
        }
      ],
      value: {
        arr: [
          { icon: 'blah' },
          { icon: 'foo' },
          null,
          { icon: 'bar' }
        ]
      }
    }
  }
];
