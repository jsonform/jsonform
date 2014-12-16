var $tests = $('.tests');
var idx = 0; //or enter the index like before. ex.: 5
var limit = (idx == 0 ? tests.length - 1 : idx);

for (idx; idx <= limit; idx++) {
    if (!tests[idx].jsonform.form) {
      tests[idx].jsonform.form = ['*'];
    }
    tests[idx].jsonform.form.push({
      type: 'actions',
      items: [
        {
          type: 'submit',
          value: 'Submit'
        }
      ]
    });
    tests[idx].jsonform.onSubmit = function (errors, values) {
      console.log(errors, values);
    };

    $('<h1>Test "<span class="test-name"></span>"</h1>').appendTo($tests);
    $('<form id="testform" class="form-vertical"></form>').appendTo($tests);
    $tests.find(".test-name").last().html(tests[idx].name);
    $tests.find("#testform").last().jsonForm(tests[idx].jsonform);
}