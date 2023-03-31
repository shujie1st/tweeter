/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// loops through tweets in reverse chronological order
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function(tweets) {
  $("#the-tweets").empty(); // clear the container everytime before appending the tweets
  for (let i = tweets.length - 1; i >= 0; i--) {
    $("#the-tweets").append(createTweetElement(tweets[i]));
  }
};

// escape function to use with input text to prevent Cross-Site Scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Function to generate the DOM structure for a given tweet object
const createTweetElement = function(tweet) {
  let $tweet = $(`
<article>
  <header>
    <div>
      <img src=${tweet.user.avatars} alt="profile picture">
      <span class="name">${tweet.user.name}</span>
    </div>
    <div class="right-div">${tweet.user.handle}</div>
  </header>
  <p>${escape(tweet.content.text)}</p>
  <footer>
    <span>${timeago.format(tweet.created_at)}</span>
    <div class="icon">
      <i class="fa-sharp fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-sharp fa-solid fa-heart"></i>
    </div>
  </footer>
</article>
`);
  return $tweet;
};

// Function using AJAX to fetch tweets from the server
const loadTweets = function() {
  $.ajax({
    type: "GET",
    url: "/tweets",
    success: (res) => renderTweets(res),
    error: (err) => console.error(err)
  });
};

$(document).ready(function() {
  loadTweets();

  $("nav button").click(function() {
    $("section.new-tweet").slideToggle();
    $("#tweet-text").focus();
  });

  // form submission using JQuery
  $("form").submit((event) => {
    event.preventDefault();

    // Validate message length before sending the form data to the server
    // Return error message if empty tweet or exceeds the 140 character limit
    // When user submits a new tweet, the error message will slide out of view before validation
    $("#error").slideUp(500, function() {
      if ($("#tweet-text").val().trim().length === 0) {
        $("#error span").html("Can't send empty message!");
        $("#error").slideDown(500);
        return;
      } else if ($("#tweet-text").val().length > 140) {
        $("#error span").html("You've exceeded the 140 character limit!");
        $("#error").slideDown(500);
        return;
      }

      // use AJAX to send the serialized data to the server
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: $("form").serialize(),
        success: () => {
          loadTweets(); // refetch tweets on submission
          $("#tweet-text").val("").trigger("input"); // clear textarea and recount characters after user submits form
        },
        error: (err) => {
          console.error(err);
          $("#error span").html("Send tweet failed!");
          $("#error").slideDown(500);
        }
      });
    });
  });
});

