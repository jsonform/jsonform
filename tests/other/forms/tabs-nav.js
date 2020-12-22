$("#testform").jsonForm({
  "schema": {
    "favorite_movie":{
      "type":"string",
      "title":"Favorite Movie",
      "enum":[
        "Field of Dreams",
        "Braveheart",
        "A League of Their Own"
      ]
    },
    "favorite_tv":{
      "type":"string",
      "title":"Favorite TV Series",
        "enum":[
          "The Big Bang Theory",
          "Friends",
          "Grey's Anatomy",
          "Babylon 5",
          "Firefly",
          "The Flinstones"
        ]
    },
    "actor_male":{
      "type":"string",
      "title":"Favorite Male Actor",
      "enum":[
        "Tom Hanks",
        "Sean Connery",
        "Mark Harmon",
        "Client Eastwood",
        "Neil Patrick Harris"
      ]
    },
    "actor_female":{
      "type":"string",
      "title":"Favorite Female Actor",
      "enum":[
        "Emily Blunt",
        "Julie Andrews",
        "Meryl Streep",
        "Helen Mirren"
      ]
    }
  },
  "form": [
    {
      "type":"fieldset",
      "title":"Example of Tabs",
      "items":[
        {
          "type":"tabs",
          "id":"navtabs",
          "items": [
            {
              "title":"Movies",
              "type":"tab",
              "items":[
                {  
                  "key":"favorite_movie",
                  "type":"radiobuttons",
                  "activeClass": "btn-success"
                }
              ]
            },
            {
              "title":"TV Series",
              "type":"tab",
              "items":[
                {  
                  "key":"favorite_tv",
                  "type":"radiobuttons",
                  "activeClass": "btn-success"
                }
              ]
            },
            {
              "title":"Actors",
              "type":"tab",
              "items":[
                {  
                  "key":"actor_male",
                  "type":"radiobuttons",
                  "activeClass": "btn-success"
                },
                {  
                  "key":"actor_female",
                  "type":"radiobuttons",
                  "activeClass": "btn-success"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "actions",
      "items": [
        {
          "type": "submit",
          "value": "Submit"
        }
      ]
    }
  ],
  "onSubmit": function (errors,values) {
  console.log(errors,values);
  }
});