/*git 
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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
      ${timeago.format(tweetData.created_at)}
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

const loadTweets = function() {
  $.get('/tweets', function(data, status){
    renderTweets(data);
  }
)};


//document ready listener
$(function() {

  //button click (prevent default form submit)
  $('.tweetform').on('submit', function(event){
    event.preventDefault();
    const tweetData = $(this).serialize();
    $.post('/tweets', tweetData, console.log("posted")); //client posted to server succesfully
  });
  
  loadTweets()


});
//if console logs lyrics in order, our function works :)