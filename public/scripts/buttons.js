$(document).ready(function() {
  $(".new-tweet").hide();


  $('.nav-text').on('click', function() {

    $('.new-tweet').is(':hidden') ? 
    $(".new-tweet").slideDown() :
    $(".new-tweet").slideUp();

  });

});