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
          width: '600px',
          height: '100px'
        }
      ]
    }
  }
];
