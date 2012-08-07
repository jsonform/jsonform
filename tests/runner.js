var idx = 5;
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
$("#test-id").html(tests[idx].name);
$("#testform").jsonForm(tests[idx].jsonform);