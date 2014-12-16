var tests = [
  {
    name: 'english',
    jsonform: {
      schema: {
        textfield: {
          title: '{{hello}} {{user.name}}',
          type: 'string',
          'default': '{{def}}',
          description: '{{desc}}'
        },
        tagline: {
          type: 'string',
          'enum': [
            'happy',
            'lifesucks',
            'cestlavie'
          ]
        },
        positive: {
          type: 'boolean'
        },
        arr: {
          type: 'array',
          items: {
            type: 'string',
            title: '{{arr.title}} {{idx}}',
            description: '{{arr.desc}}',
            'default': '{{arr.default}}'
          }
        }
      },
      form: [
        {
          key: 'textfield',
          prepend: '{{prepend}}',
          append: '{{append}}'
        },
        {
          key: 'tagline',
          titleMap: {
            'happy': '{{tagline.happy}}',
            'lifesucks': '{{tagline.lifesucks}}',
            'cestlavie': '{{tagline.cestlavie}}'
          }
        },
        {
          key: 'positive',
          inlinetitle: '{{positive.label}}'
        },
        'arr'
      ],
      tpldata: {
        hello: 'Hello',
        user: {
          name: 'tidoust'
        },
        desc: 'Mood of the day',
        prepend: 'I\'m feeling',
        def: 'happy',
        append: 'today',
        positive: {
          label: 'Check the box for extra karma'
        },
        tagline: {
          happy: 'Don\'t worry, be happy!',
          lifesucks: 'Life sucks',
          cestlavie: 'C\'est la vie!'
        },
        arr: {
          title: 'Short memory item',
          desc: 'I think about...',
          'default': 'kittens'
        }     
      }
    }
  },

  {
    name: 'french',
    jsonform: {
      schema: {
        textfield: {
          title: '{{hello}} {{user.name}}',
          type: 'string',
          'default': '{{def}}',
          description: '{{desc}}'
        },
        tagline: {
          type: 'string',
          'enum': [
            'happy',
            'lifesucks',
            'cestlavie'
          ]
        },
        positive: {
          type: 'boolean'
        },
        arr: {
          type: 'array',
          items: {
            type: 'string',
            title: '{{arr.title}} {{idx}}',
            description: '{{arr.desc}}',
            'default': '{{arr.default}}'
          }
        }
      },
      form: [
        {
          key: 'textfield',
          prepend: '{{prepend}}',
          append: '{{append}}'
        },
        {
          key: 'tagline',
          titleMap: {
            'happy': '{{tagline.happy}}',
            'lifesucks': '{{tagline.lifesucks}}',
            'cestlavie': '{{tagline.cestlavie}}'
          }
        },
        {
          key: 'positive',
          inlinetitle: '{{positive.label}}'
        },
        'arr'
      ],
      tpldata: {
        hello: 'Salut',
        user: {
          name: 'tidoust'
        },
        desc: 'Humeur du moment',
        def: 'joyeux',
        prepend: 'Je suis',
        append: 'aujourd\'hui',
        positive: {
          label: 'Cocher la case pour des points de karma en plus!'
        },
        tagline: {
          happy: 'Y\'a d\'la joie!',
          lifesucks: 'Vie de merde!',
          cestlavie: '"C\'est la vie!" comme disent les anglo-saxons'
        },
        arr: {
          title: 'Dans ma mémoire à court terme',
          desc: 'Je fais rien qu\'à penser à...',
          'default': 'des chats'
        }
      }
    }
  }
];
