var tests = [
  {
    name: 'minimal',
    jsonform: {
      schema: {
        code: {
          type: 'string',
          title: 'Code'
        }
      },
      form: [
        {
          key: 'code',
          type: 'ace',
          aceMode: 'json',
          width: '100%',
          height: '100px'
        }
      ]
    }
  }
];
