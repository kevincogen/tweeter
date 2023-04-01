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
];

const createTweetElement = function(tweetData) {
  const $tweet = $(`      
  <article class="tweet">
  <header>
    <div class="name">
      <img src=${tweetData.user.avatars}>
      ${tweetData.user.name}
    </div>
    <div class="id">
      ${tweetData.user.handle}
    </div>
  </header>
  <div class="content">
    ${tweetData.content.text}
  </div>
  <footer>
    <div>
      ${tweetData.created_at}
    </div>
    <div>
      <span class="fas fa-flag"></span>
      <span class="fas fa-retweet"></span>
      <span class="fas fa-heart"></span>
    </div>
  </footer>
</article>`);

  return $tweet;
};

const renderTweets = function(tweetArr) {
  for (const obj of tweetArr) {
    const $tweet = createTweetElement(obj);
    $('#tweets-container').append($tweet);
  }
};

$(function() {
  renderTweets(data);
  console.log("hello...is there anybody in there?");
});