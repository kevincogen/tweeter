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
      <img src="${$('<div>').text(tweetData.user.avatars).html()}">
      ${$('<div>').text(tweetData.user.name).html()}
    </div>
    <div class="id">
      ${$('<div>').text(tweetData.user.handle).html()}
    </div>
  </header>
  <div class="content">
    ${$('<div>').text(tweetData.content.text).html()}
  </div>
  <footer>
    <div>
      ${$('<div>').text(timeago.format(tweetData.created_at)).html()}
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
    $('#tweets-container').prepend($tweet);
  }
};

const loadTweets = function() {
  $.get('/tweets', function(data, status){
    renderTweets(data);
  }
)};


//document ready listener
$(function() {

  //Tweet button click
  $('.tweetform').on('submit', function(event){
    event.preventDefault();

    //validation rules
    if ($('#tweet-text').val() === "") {
      alert("Empty Brain? You can't tweet Nothing!")
      return;
    } else if ($('#tweet-text').val().length > 140) {
      alert("The Character Length is too damn high!")
      return;
    }

    //serialize tweet and post to server
    const tweetData = $(this).serialize();
    $.post('/tweets', tweetData)

    //render new tweet sans refresh
    loadTweets()
  });
  
  loadTweets()


});
//if console logs lyrics in order, our function works :)