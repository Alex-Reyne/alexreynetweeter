$(document).ready(function() {

$('.nav-text').on('click', function(event) {
  event.preventDefault();

  return $(".new-tweet").slideUp();
  
  });

});