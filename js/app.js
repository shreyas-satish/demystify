
var genID = function () {
  // Imported from https://gist.github.com/gordonbrander/2230317
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 9);
};

$(function(){
  var session_id = localStorage.getItem("session_id");
  if (!session_id) {
    session_id = genID();
    localStorage.setItem("session_id", session_id);
  }

  // Initialize form fields with information that was entered during an earlier session
  $(".interest-form").each(function(){
    var interest_form = $(this);
    var current_interest_val = localStorage.getItem(interest_form.attr('id') + "_interest");
    if (!!current_interest_val) {
      interest_form.find("textarea[name=interest]").val(current_interest_val);
    }
  });

  $(".session-form").submit(function(e) {
    e.preventDefault();
    var $form = $(this);

    // save session id
    $form.find("input[name=session_id]").val(session_id);
    localStorage.setItem("session_id", session_id);

    // save interest value in localStorage
    var interest_value = $form.find("textarea[name=interest]").val();
    if (!!interest_value) {
      localStorage.setItem($form.attr('id') + "_interest", interest_value);
    }

    // submit form to server
    $.post($form.attr("action"), $form.serialize()).then(function() {
      // pass
    });
  });
});