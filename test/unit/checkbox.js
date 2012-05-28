var tests = [
  {
    name: 'minimal',
    jsonform: {
      schema: {
        check: {
          type: 'boolean',
          title: 'Title'
        }
      }
    }
  },
  {
    name: 'inline',
    jsonform: {
      schema: {
        check: {
          type: 'boolean',
          title: 'Title',
          default: true
        }
      },
      form: [
        {
          key: 'check',
          inlinetitle: 'Check da box'
        }
      ]
    }
  }
];
