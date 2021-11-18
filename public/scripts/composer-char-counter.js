$(document).ready(function() {

  $('#tweet-text').on("input", function(event) {
    const length = $(this).val().length
    const max = 140;
    const charLeft = max - length;
    const counter = 
    $(this).parentsUntil(".new-tweet")
      .find(".counter")

    counter.text(charLeft);

    if (charLeft < 0) {
      $(counter).attr("id", "negative"); 
    } else {
      $(counter).removeAttr("id", "negative"); 
    }

  });

});