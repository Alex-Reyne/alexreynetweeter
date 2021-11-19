$(document).ready(function() {

  // counts the characters you've types in the new tweet box.
  $('#tweet-text').on("input", function(event) {
    const length = $(this).val().length // length of what you've typed so far
    const max = 140; // Max chars allowed
    const charLeft = max - length;
    const counter = // finds the div .counter
    $(this).parentsUntil(".new-tweet")
      .find(".counter")

    // changes the counter text when you type.
    counter.text(charLeft);

    // adds an ID to the counter that will change the color to red
    // if you've gone over the max characters (140)
    if (charLeft < 0) {
      $(counter).attr("id", "negative"); 
    } else {
      $(counter).removeAttr("id", "negative"); 
    }

  });

});