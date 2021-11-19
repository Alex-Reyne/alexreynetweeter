$(document).ready(function() {
  $(".new-tweet").hide();
  $('#to-top').hide();


  $('.nav-text').on('click', function() {

    $('.new-tweet').is(':hidden') ? 
    $(".new-tweet").slideDown() :
    $(".new-tweet").slideUp();

    $("#tweet-text").focus()

  });

  $('#to-top').on('click', function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(".new-tweet").slideDown()
    $("#tweet-text").focus()
  });

  $(document).scroll(function() {
    const y = $(this).scrollTop();
    if (y > 100) {
      $('#to-top').slideDown();
    } else {
      $('#to-top').slideUp();
    }
  });

});