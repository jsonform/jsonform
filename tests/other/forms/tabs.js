$("#testform").jsonForm({
  "schema": {
    "happy": {
      "title": "Are you happy?",
      "type": "string",
      "enum": [
        "yes",
        "no"
      ]
    },
    "user": {
      "title": "Username",
      "type": "string"
    },
    "playlist": {
      "title": "Playlist URL",
      "type": "string"
    },
    "search": {
      "title": "Search text",
      "type": "string"
    },
    "feed": {
      "title": "Feed",
      "type": "string",
      "enum":[
        "",
        "top_rated",
        "most_viewed",
        "most_shared",
        "most_popular",
        "most_recent",
        "most_discussed",
        "most_responded",
        "recently_featured",
        "on_the_web"
      ]
    },
    "clientkey": {
      "title": "Client key",
      "type": "string",
      "required": true
    }
  },
  "form": [
    "happy",
    {
      "type": "selectfieldset",
      "title": "Search by",
      "items": [
        {
          "type": "optionfieldset",
          "legend": "Username",
          "items": [
            "user"
          ]
        },
        {
          "type": "optionfieldset",
          "legend": "Playlist",
          "items": [
            "playlist"
          ]
        },
        {
          "type": "optionfieldset",
          "legend": "String",
          "items": [
            "search"
          ]
        },
        {
          "type": "optionfieldset",
          "legend": "Feed name",
          "items": [
            "feed"
          ]
        }
      ]
    },
    "clientkey",
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