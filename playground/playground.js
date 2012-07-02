$('document').ready(function () {
  $('#form').jsonForm({
    schema: {
      greatform: {
        title: 'JSON Form object to render',
        type: 'string',
        'default': '{\n  "schema": {\n    "field": {\n      "type": "string",\n      "title": "A field"\n    }\n  },\n  "form": [\n    {\n      "key": "field"\n    }\n  ]\n}\n'
      }
    },
    form: [
      {
        key: 'greatform',
        type: 'ace',
        aceMode: 'json',
        width: '100%',
        height: '' + (window.innerHeight - 200) + 'px',
        notitle: true
      },
      {
        type: 'submit',
        value: 'Try this out!'
      }
    ],
    onSubmitValid: function (values) {
      var formObject = null;

      // Reset result pane
      $('#result').html('');

      // Parse entered content as JSON
      try {
        formObject = JSON.parse(values.greatform);
      }
      catch (e) {
        $('#result').html('<pre>Hmmm, sorry, the entered content does not seem to be valid JSON.\nJSON parser returned: ' + e + '</pre>');
        return;
      }

      // Render the resulting form, binding to onSubmitValid
      try {
        formObject.onSubmitValid = function (values) {
          if (console && console.log) {
            console.log('Values extracted from submitted form', values);
          }
          alert('Form submitted. JSON Form generated the following object: ' + JSON.stringify(values, null, 2));
        };
        $('#result').html('<form id="result-form" class="form-vertical"></form>');
        $('#result-form').jsonForm(formObject);
      }
      catch (e) {
        $('#result').html('<pre>Hmmm, sorry, I could not generate the form.\nJSON form returned: ' + e + '</pre>');
        return;
      }
    }
  });
});