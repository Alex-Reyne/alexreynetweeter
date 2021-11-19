$(document).ready(function() {
  // hides the new-tweet box when page loads
  $(".new-tweet").hide();
  // hides the to-top button when page loads
  $('#to-top').hide();

  // handles the nav button "write a new tweet"
  $('.nav-text').on('click', function() {

    // slides the new-tweet box into view or out of view
    // when nav button is clicked
    $('.new-tweet').is(':hidden') ? 
    $(".new-tweet").slideDown() :
    $(".new-tweet").slideUp();

    // focus the tweet-text box when the nav button is
    // clicked
    $("#tweet-text").focus()

  });

  // handles the to-top button
  $('#to-top').on('click', function() {

    // scroll to top when clicked
    // then reveal the new-tweet box
    // then focus the tweet-text box
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(".new-tweet").slideDown()
    $("#tweet-text").focus()

  });

  // reaveal/hide the to-top button
  $(document).scroll(function() {
    // counts how many pixels you are from
    // the top of the page
    const y = $(this).scrollTop();

    // reveals/hides the button if you are 100 pixels
    //from the top of the page.
    if (y > 100) {
      $('#to-top').slideDown();
    } else {
      $('#to-top').slideUp();
    }

  });

});