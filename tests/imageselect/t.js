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
  },
  {
    name: 'inverse',
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
          imageSelectorTitle: 'Choose an icon!',
          imageButtonClass: 'btn-inverse'
        }
      ]
    }
  },
  {
    name: 'warning',
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
          imageSelectorTitle: 'Choose an icon!',
          imageButtonClass: 'btn-warning'
        }
      ]
    }
  },
  {
    name: 'sleek',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Icon',
          "enum": [
            "app/images/tv-contact.png",
            "app/images/tv-events.png",
            "app/images/tv-map.png",
            "app/images/tv-news.png",
            "app/images/tv-photos.png",
            "app/images/tv-play.png",
            "app/images/tv-products.png",
            "app/images/tv-sounds.png",
            "app/images/tv-statuses.png",
            "app/images/tv-videos.png",
            "app/images/tv-zoom.png"
          ]
        }
      },
      form: [
        {
          key: 'choice',
          type: 'imageselect',
          imageButtonClass: 'btn-inverse',
          imagePrefix: 'http://exports.platform.joshfire.com.s3.amazonaws.com/template/official/4f/cc/4fccd335ef88120db50000dd/df5d0b32d95b/',
          imageWidth: 32,
          imageHeight: 64
        }
      ]
    }
  },
  {
    name: 'absolute',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Icon',
          "enum": [
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/add-to-desktop.png',
            'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/actions/address-book-new-2.png',
            "app/images/tv-contact.png",
            "app/images/tv-events.png",
            "app/images/tv-map.png",
            "app/images/tv-news.png",
            "app/images/tv-photos.png",
            "app/images/tv-play.png",
            "app/images/tv-products.png",
            "app/images/tv-sounds.png",
            "app/images/tv-statuses.png",
            "app/images/tv-videos.png",
            "app/images/tv-zoom.png"
          ]
        }
      },
      form: [
        {
          key: 'choice',
          type: 'imageselect',
          imageButtonClass: 'btn-inverse',
          imagePrefix: 'http://exports.platform.joshfire.com.s3.amazonaws.com/template/official/4f/cc/4fccd335ef88120db50000dd/df5d0b32d95b/',
          imageWidth: 32,
          imageHeight: 64
        }
      ]
    }
  },
  {
    name: 'suffix',
    jsonform: {
      schema: {
        choice: {
          type: 'string',
          title: 'Icon',
          "enum": [
            "contact",
            "events",
            "map",
            "news",
            "photos",
            "play",
            "products",
            "sounds",
            "statuses",
            "videos",
            "zoom"
          ]
        }
      },
      form: [
        {
          key: 'choice',
          type: 'imageselect',
          imageButtonClass: 'btn-inverse',
          imagePrefix: 'http://exports.platform.joshfire.com.s3.amazonaws.com/template/official/4f/cc/4fccd335ef88120db50000dd/df5d0b32d95b/app/images/tv-',
          imageSuffix: '.png',
          imageWidth: 32,
          imageHeight: 64
        }
      ]
    }
  },
];