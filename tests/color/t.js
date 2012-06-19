var tests = [
  {
    name: 'minimal',
    jsonform: {
      schema: {
        mainappcolor: {
          type: 'string',
          title: 'One color',
          format: 'color',
          'default': 'blue'
        }
      }
    }
  },
  {
    name: 'form',
    jsonform: {
      schema: {
        mainappcolor: {
          type: 'string',
          title: 'One color'
        }
      },
      form: [
        {
          key: 'mainappcolor',
          type: 'color'
        }
      ]
    }
  }
];