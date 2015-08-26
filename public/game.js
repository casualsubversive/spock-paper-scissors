var game = {
  playerScore: 0,
  computerScore: 0,
  round: 1,
  outcome: "",
  choices: ["kirk", "spock", "bones"],
  defeats: ['spock', 'bones', 'kirk'],
  randomChoice: function() {
    var i = Math.floor(Math.random() * this.choices.length);
    return this.choices[i];
  },
  winRound: function() {
    this.round++;
    this.playerScore++;
  },
  loseRound: function() {
    this.round++;
    this.computerScore++;
  },
  tieRound: function() {
    this.round++;
},
  scoreRound: function(playerChoice) {
    var computerChoice = this.randomChoice();
    if (this.choices.indexOf(playerChoice) === this.defeats.indexOf(computerChoice)) {
      this.winRound();
    } else if (this.choices.indexOf(playerChoice) === this.choices.indexOf(computerChoice)) {
      this.tieRound();
    } else {
      this.loseRound();
    }
    this.endRound();
  },
  endRound: function() {
    $('#player-score').text(this.playerScore);
    $('#computer-score').text(this.computerScore);
    $('.feedback:first').text(this.outcome)
    $('.feedback:last').text('Round ' + this.round + '.')
  }
};

// Player makes selection
$(".cartoon-head").click( function() {
  event.preventDefault();
  game.scoreRound(event.target.id);
})
