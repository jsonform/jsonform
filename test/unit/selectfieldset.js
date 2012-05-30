var tests = [
  {
    name: 'minimal',
    jsonform: {
      schema: {
        text: {
          type: 'string',
          title: 'Text field'
        },
        nb: {
          type: 'number',
          title: 'Number'
        }
      },
      form: [
        {
          type: 'selectfieldset',
          title: 'Make your choice',
          items: [
            'text',
            'nb',
            {
              type: 'help',
              helpvalue: 'Yo, selected choice 3!'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'legend',
    jsonform: {
      schema: {
        text: {
          type: 'string',
          title: 'Text field'
        },
        nb: {
          type: 'number',
          title: 'Number'
        }
      },
      form: [
        {
          type: 'selectfieldset',
          title: 'Make your choice',
          items: [
            {
              key: 'text',
              legend: 'Choice 1'
            },
            {
              key: 'nb',
              legend: 'Choice 2'
            },
            {
              type: 'help',
              helpvalue: 'Yo, selected choice 3!',
              legend: 'Choice 3'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'optionfieldset',
    jsonform: {
      schema: {
        text: {
          type: 'string',
          title: 'Text field'
        },
        nb: {
          type: 'number',
          title: 'Number'
        }
      },
      form: [
        {
          type: 'selectfieldset',
          title: 'Make your choice',
          items: [
            {
              type: 'optionfieldset',
              title: 'Choice 1',
              items: [
                'text',
                {
                  type: 'help',
                  helpvalue: 'Yo, selected choice 1!'
                }
              ]
            },
            {
              type: 'optionfieldset',
              title: 'Choice 2',
              items: [
                'nb',
                {
                  type: 'help',
                  helpvalue: 'Yo, selected choice 2!'
                }
              ]
            },
            {
              type: 'optionfieldset',
              title: 'Choice 3',
              items: [
                {
                  type: 'help',
                  helpvalue: 'Yo, selected choice 3!'
                }
              ]
            }
          ]
        }
      ]
    }
  }
];
