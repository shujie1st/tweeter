$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let count = 140 - $(this).val().length;
    let output = $(this).parent().find("output.counter");
    if (count < 0) {
      if (!output.hasClass("red")) {
        output.addClass("red");
      }   
    } else {
      if (output.hasClass("red")){
        output.removeClass("red");
      }
    }
    output.val(count);
  });
});