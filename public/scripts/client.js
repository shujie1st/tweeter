/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    $("#the-tweets").append(createTweetElement(tweet));
  }
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
  <p>${tweet.content.text}</p>
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
}

// use AJAX to fetch tweets from the server
const loadTweets = function() {
  $.ajax({
    type: "GET",
    url: "/tweets",
    success: (res) => renderTweets(res),
    error: (err) => console.error(err)
  })
};

$(document).ready(function() {
// form submission using JQuery
$("form").submit((event) => {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/tweets/",
      data: $("form").serialize(),
      error: (err) => console.error(err)
    }) 
  });

  loadTweets();
});

