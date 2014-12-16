var tests = [
  {
    name: 'minimal',
    jsonform: {
      form: [
        {
          type: 'actions'
        }
      ]
    }
  },
  {
    name: 'submit',
    jsonform: {
      form: [
        {
          type: 'actions',
          items: [
            {
              type: 'submit',
              title: 'Submit'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'button',
    jsonform: {
      form: [
        {
          type: 'actions',
          items: [
            {
              type: 'button',
              title: 'Button'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'buttons',
    jsonform: {
      form: [
        {
          type: 'actions',
          items: [
            {
              type: 'button',
              title: 'Button 1'
            },
            {
              type: 'button',
              title: 'Button 2'
            },
            {
              type: 'submit',
              title: 'Button 3'
            },
            {
              type: 'button',
              title: 'Button 4'
            }
          ]
        }
      ]
    }
  }
];
