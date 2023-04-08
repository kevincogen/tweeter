/*git
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Helper Functions:

//Format tweet object into html
//escape input text in temp div with .text() to .html()
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

//render tweet elements
const renderTweets = function(tweetArr) {
  $('#tweets-container').html("");
  for (const obj of tweetArr) {
    const $tweet = createTweetElement(obj);
    $('#tweets-container').prepend($tweet);
  }
};
//call to action
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  }).then(function(data) {
    renderTweets(data);
  });
};

//document ready listener
$(function() {
  $(".data-error").hide();
  //Tweet button click
  $('.tweetform').on('submit', function(event) {
    event.preventDefault();
    $(".data-error").hide();
    //validation rules
    if ($('#tweet-text').val() === "") {
      const noChars = $('<p>Empty Brain? You can\'t tweet nothing!</p>');
      $('.data-error').slideDown().empty().append(noChars);
      return;
    } else if ($('#tweet-text').val().length > 140) {
      const tooManyChars = $('<p>The Character Length is too damn high!</p>');
      $('.data-error').show().slideDown().empty().append(tooManyChars);
      return;
    }
    //serialize tweet and post to server
    const tweetData = $(this).serialize();
    $.post('/tweets', tweetData, function() {
      $('#tweet-text').val('');
      //render new tweet sans refresh
      loadTweets();
      $(".counter").html("140");
    });
  });
  
  loadTweets();
});