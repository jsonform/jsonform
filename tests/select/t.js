var tests = [
  {
    name: 'minimal',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Title',
          'enum': [
            'choice-1',
            'choice-2',
            'choice-3'
          ]
        }
      }
    }
  },
  {
    name: 'titleMap',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Title',
          'enum': [
            'choice-1',
            'choice-2',
            'choice-3'
          ]
        }
      },
      form: [
        {
          key: 'choice',
          titleMap: {
            'choice-1': 'Choice 1',
            'choice-2': 'Choice 2',
            'choice-3': 'Choice 3'
          }
        }
      ]
    }
  },
  {
    name: 'value',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Title',
          'enum': [
            'choice-1',
            'choice-2',
            'choice-3'
          ]
        }
      },
      value: {
        choice: 'choice-3'
      }
    }
  },
  {
    name: 'titleMap-value',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Title',
          'enum': [
            'choice-1',
            'choice-2',
            'choice-3'
          ]
        }
      },
      form: [
        {
          key: 'choice',
          titleMap: {
            'choice-1': 'Choice 1',
            'choice-2': 'Choice 2',
            'choice-3': 'Choice 3'
          }
        }
      ],
      value: {
        choice: 'choice-3'
      }
    }
  },
  {
    name: 'radios-value',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Title',
          'enum': [
            'choice-1',
            'choice-2',
            'choice-3'
          ]
        }
      },
      value: {
        choice: 'choice-3'
      }
    }
  },
  {
    name: 'radios-titleMap-value',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Title',
          'enum': [
            'choice-1',
            'choice-2',
            'choice-3'
          ]
        }
      },
      form: [
        {
          key: 'choice',
          type: 'radios',
          titleMap: {
            'choice-1': 'Choice 1',
            'choice-2': 'Choice 2',
            'choice-3': 'Choice 3'
          }
        }
      ],
      value: {
        choice: 'choice-3'
      }
    }
  },
  {
    name: 'Integer titleMap',
    jsonform: {
      schema: {
        choice: {
          type: 'integer',
          title: 'Title',
          'enum': [
            1,
            2,
            3
          ],
          'default': 3
        }
      },
      form: [
        {
          key: 'choice',
          titleMap: {
            1: 'Choice 1',
            2: 'Choice 2',
            3: 'Choice 3'
          }
        }
      ]
    }
  }
];
