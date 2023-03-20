$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let count = 140 - $(this).val().length;
    let output = $(this).parent().find("output.counter");

    // Add class "red" to counter if users exceed the 140 character limit
    // Or if not exceed limit, remove the class "red" if it already existed
    if (count < 0) {
      if (!output.hasClass("red")) {
        output.addClass("red");
      }
    } else {
      if (output.hasClass("red")) {
        output.removeClass("red");
      }
    }

    // Update the output value for counter
    output.val(count);
  });
});