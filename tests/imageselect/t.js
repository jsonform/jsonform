var tests = [
  {
    name: 'minimal',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Title',
          'enum': [
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/add-to-desktop.png',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/address-book-new-2.png',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/application-exit-4.png',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/appointment-new-3.png',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/archive-insert-2.png'
          ]
        }
      },
      form: [
        {
          key: 'choice',
          type: 'imageselect'
        }
      ]
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
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/add-to-desktop.png',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/address-book-new-2.png',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/application-exit-4.png',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/appointment-new-3.png',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/archive-insert-2.png'
          ]
        }
      },
      form: [
        {
          key: 'choice',
          type: 'imageselect',
          titleMap: {
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/add-to-desktop.png': 'Add to desktop',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/address-book-new-2.png': 'Address book',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/application-exit-4.png': 'Exit',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/appointment-new-3.png': 'New appointment',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/archive-insert-2.png': 'Insert archive'
          }
        }
      ]
    }
  },
  {
    name: 'prefix',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Title',
          'enum': [
            'add-to-desktop.png',
            'address-book-new-2.png',
            'application-exit-4.png',
            'appointment-new-3.png',
            'archive-insert-2.png'
          ],
          'default': 'application-exit-4.png'
        }
      },
      form: [
        {
          key: 'choice',
          type: 'imageselect',
          imagePrefix: 'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/'
        }
      ]
    }
  },
  {
    name: 'options',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Title',
          'enum': [
            'add-to-desktop.png',
            'address-book-new-2.png',
            'application-exit-4.png',
            'appointment-new-3.png',
            'archive-insert-2.png'
          ]
        }
      },
      form: [
        {
          key: 'choice',
          type: 'imageselect',
          imagePrefix: 'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/',
          imageWidth: 64,
          imageHeight: 64,
          imageSelectorColumns: 3,
          imageSelectorTitle: 'Choose an icon!'
        }
      ]
    }
  }
];