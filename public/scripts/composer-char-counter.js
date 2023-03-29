$(document).ready(function() {
  const MAX_CHARACTERS = 140; // maximum number of characters allowed in a tweet
  const tweetText = $("#tweet-text");
  const counter = $(".counter");

  // Listen for input events on the tweet text area
  tweetText.on("input", function() {
    const tweetLength = tweetText.val().length; // get the length of the tweet text
    const remainingChars = MAX_CHARACTERS - tweetLength; // calculate the remaining characters

    // Update the counter text and color based on the remaining characters
    counter.text(remainingChars);
    if (remainingChars < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
  });
});