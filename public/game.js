var parseGameData = function() {
  $.get("/game.json", function(game) {
    $(".feedback:first").html(game.outcome);
    $(".feedback:last").html(game.round);
    $("#player-score").text(game.player_score);
    $("#computer-score").text(game.computer_score);
  })
}


// On page load, get game data as JSON

// Post player selection and retreive results as JSON
// $(".cartoon-head").click( function() {
//   event.preventDefault();
//   $.post("/game.json", "name=" + event.target.id);
// })


$(".cartoon-head").click( function() {
  event.preventDefault();
  $.ajax({
    method: "post",
    url: "/game.json",
    data: {name: event.target.id},
    complete: parseGameData
  });
})
