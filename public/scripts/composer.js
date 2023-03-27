$(document).ready(function() {
  $(window).scroll(function() {
    // when user starts to scroll:
    if (window.scrollY > 0) {
      $("nav button").hide();
      $("#scroll-to-top").show();
    } else {
      // when user scrolls back to the top:
      $("nav button").show();
      $("#scroll-to-top").hide();
    }
  });

  // when scroll-to-top button clicked:
  $("#scroll-to-top").click(function() {
    $(window).scrollTop(0);
    $("section.new-tweet").show();
    $("#tweet-text").focus();
  });
});