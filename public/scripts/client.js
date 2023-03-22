/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
    <span>${tweet.created_at}</span>
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

$(document).ready(function() {
  renderTweets(data);
});
