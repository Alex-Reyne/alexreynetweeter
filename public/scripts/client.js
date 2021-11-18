/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  $(".error-alert1").hide();
  $(".error-alert2").hide();

  const renderTweets = function(tweets) {
    
    tweets.forEach(element => {
      $('#tweets-container').prepend(createTweetElement(element));
    });

  };

  const loadTweets = function() {
      
    $.ajax('/tweets', { method: 'GET' })
      .then((tweetsHTML) => {
        $('#tweets-container').empty();
        renderTweets(tweetsHTML);
      });
    
  };

  loadTweets();

  const createTweetElement = function(tweet) {

    const escape = function(string) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(string));
      return div.innerHTML;
    }

    const $tweet = $(`
      <article class='tweet'>
        <header>
          <div class='tweet-profile-pic'>
            <img src="${tweet.user.avatars}">
            <p>${tweet.user.name}</p>
          </div>
          <p class='handle'>${tweet.user.handle}</p>
        </header>
        <div>
          <p class='feed-tweet-text'>${escape(tweet.content.text)}</p>
        </div>
        <hr class='tweet-line'>
        <footer>
          <p class='tweet-time'>${timeago.format(tweet.created_at)}</p>
          <div class='icons'>
            <i class="fab fa-font-awesome-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="far fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;

  };

  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const result = $(this).serialize();

    $(".error-alert1").hide();
    $(".error-alert2").hide();

    if ($('#tweet-text').val().length === 0) {
      return $(".error-alert1").slideDown();
    }
    
    if ($('#tweet-text').val().length > 140) {
      return $(".error-alert2").slideDown();
    }
    
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: result
    })
      .then(function(msg) {
        $("#tweet-text").val('');
        loadTweets();
      })

      $(this).find('.counter').text(140);
    });
    
});