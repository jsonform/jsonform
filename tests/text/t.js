var tests = [
  {
    name: 'schema-minimal',
    jsonform: {
      schema: {
        textfield: {
          type: 'string'
        }
      }
    }
  },
  {
    name: 'schema-title',
    jsonform: {
      schema: {
        textfield: {
          type: 'string',
          title: 'Title'
        }
      }
    }
  },
  {
    name: 'schema-desc',
    jsonform: {
      schema: {
        textfield: {
          type: 'string',
          title: 'Title',
          description: 'Desc'
        }
      }
    }
  },
  {
    name: 'schema-required',
    jsonform: {
      schema: {
        textfield: {
          title: 'Title',
          type: 'string',
          required: true
        }
      }
    }
  },
  {
    name: 'schema-default',
    jsonform: {
      schema: {
        textfield: {
          title: 'Title',
          type: 'string',
          'default': 'def'
        }
      }
    }
  },
  {
    name: 'schema-value',
    jsonform: {
      schema: {
        textfield: {
          title: 'Title',
          type: 'string',
          'default': 'def'
        }
      },
      value: {
        textfield: 'val'
      }
    }
  },
  {
    name: 'form-minimal',
    jsonform: {
      schema: {
        textfield: {
          title: 'Title',
          type: 'string',
          'default': 'def'
        }
      },
      value: {
        textfield: 'val'
      },
      form: [
        'textfield'
      ]
    }
  },
  {
    name: 'form-textarea',
    jsonform: {
      schema: {
        textfield: {
          title: 'Title',
          type: 'string',
          'default': 'def'
        }
      },
      value: {
        textfield: 'val'
      },
      form: [
        {
          key: 'textfield',
          type: 'textarea',
          title: 'New title',
          description: 'New desc'
        }
      ]
    }
  },
  {
    name: 'form-password',
    jsonform: {
      schema: {
        textfield: {
          title: 'Title',
          type: 'string',
          'default': 'def'
        }
      },
      value: {
        textfield: 'val'
      },
      form: [
        {
          key: 'textfield',
          type: 'password',
          title: 'New title',
          description: 'New desc'
        }
      ]
    }
  },
  {
    name: 'form-placeholder',
    jsonform: {
      schema: {
        textfield: {
          title: 'Title',
          type: 'string'
        }
      },
      form: [
        {
          key: 'textfield',
          placeholder: 'place holder'
        }
      ]
    }
  }
];
