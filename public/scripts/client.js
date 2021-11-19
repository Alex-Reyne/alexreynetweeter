// Jquery functions to handle new tweets being posted

$(document).ready(function() {

  //hides both error alerts when page loads.
  $(".error-alert1").hide();
  $(".error-alert2").hide();

  // loads tweets onto the main page so you can see them.
  const loadTweets = function() {
      
    // ajax request to get the tweets from the database
    $.ajax('/tweets', { method: 'GET' })
      // once tweets have been loaded the tweets on the home page are
      // emptied and then redered again.
      .then((tweetsHTML) => {
        // empty the html here so that the page
        // doesn't load double the tweets every time we post.
        // having it here also keep the load fresh so that it
        // doesn't look like we are refreshing anything. 
        $('#tweets-container').empty();
        renderTweets(tweetsHTML);
      });
    
  };

  // loads tweets when you first visit the page.
  loadTweets();

  // makes tweets from database visible in the main page content.
  const renderTweets = function(tweets) {
    
    // loops through each element in the database and prepends them
    // to the tweets-container using createTweetElement function.
    tweets.forEach(element => {
      $('#tweets-container').prepend(createTweetElement(element));
    });

  };

  // creates an HTML article for the tweet passed in.
  const createTweetElement = function(tweet) {

    // escape function to prevent users from injecting
    // javascript into the DOM with thier tweets.
    const escape = function(string) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(string));
      return div.innerHTML;
    }

    // holds the article format.
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

  // handles user tweet submission.
  $('#tweet-form').submit(function(event) {

    // prevent page from doing refreshing on submit
    event.preventDefault();
    // serialize the tweet so it can be read by AJAX properly.
    const result = $(this).serialize();

    // hide error alerts before the next submit verification
    // to make it more obvious if the issue still persists
    $(".error-alert1").hide();
    $(".error-alert2").hide();

    // prevent users from submitting tweets with no characters
    if ($('#tweet-text').val().length === 0) {
      return $(".error-alert1").slideDown();
    }
    
    // prevent users from submitting tweets with more than 140 chars
    if ($('#tweet-text').val().length > 140) {
      return $(".error-alert2").slideDown();
    }
    
    // makes an ajax POST request to add
    // the new tweet to database. 
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: result
    })
      // when request is successful we clear the text box
      // and call loadTweets() to make the new tweet show up.
      .then(function(msg) {
        $("#tweet-text").val('');
        loadTweets();
      })

      // resets the character counter back to 140.
      $(this).find('.counter').text(140);
    });
    
});