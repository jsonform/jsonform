var tests = [
  {
    name: 'hidden',
    jsonform: {
      schema: {
        hidden: {
          type: 'string',
          'default': 'def'
        }
      },
      form: [
        {
          key: 'hidden',
          type: 'hidden'
        }
      ]
    }
  }
];
