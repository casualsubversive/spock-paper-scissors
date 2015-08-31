var game = {
  playerScore: 0,
  computerScore: 0,
  round: 1,
  outcome: "",
  playerChoice: "",
  lastComputerChoice: "",
  choices: ['kirk', 'spock', 'bones'],
  defeats: ['spock', 'bones', 'kirk'],
  outcomes: ['<p>Kirk fascinates Spock.', '<p>Spock logics Bones.', '<p>Bones sasses Kirk.'],

  // Attempts to make the computer selection feel more human.
  semiRandomChoice: function() {
    var index = Math.floor(Math.random() * this.choices.length);
    var computerChoice = this.choices[index];

    if (computerChoice === this.lastComputerChoice || computerChoice === this.playerChoice) {
      var chance = Math.floor(Math.random() * 4);
      if (chance < 2) {
        var index = Math.floor(Math.random() * this.choices.length);
        var computerChoice = this.choices[index];
      }
    }
    this.lastComputerChoice = computerChoice;
    if (computerChoice === this.playerChoice) {console.log('tie');}
    return computerChoice;
  },
  winRound: function() {
    var choice = this.playerChoice;
    var index = this.choices.indexOf(choice);

    this.round++;
    this.playerScore++;
    this.outcome = this.outcomes[index];
    if (this.playerScore === 3) {
      this.outcome += ("</p><p>You have defeated Khan!</p>");
      this.victory();
    } else {
      this.outcome += (" You win.</p><p>Round " + this.round + ".</p>");
    }
  },
  loseRound: function() {
    var choice = this.playerChoice;
    var index = this.defeats.indexOf(choice);

    this.round++;
    this.computerScore++;
    this.outcome = this.outcomes[index];
    if (this.computerScore === 3) {
      this.outcome += ("</p><p>Khan has defeated you!</p>");
      this.victory();
    } else {
      this.outcome += (" You lose.</p><p>Round " + this.round + ".</p>");
    }
  },
  tieRound: function() {
    this.round++;
    this.outcome = ("<p>Transporter duplicate. A tie.</p><p>Round " + this.round + ".</p>");

},
  scoreRound: function(selection) {
    this.playerChoice = selection;
    var computerChoice = this.semiRandomChoice();

    if (this.choices.indexOf(selection) === this.defeats.indexOf(computerChoice)) {
      this.winRound();
    } else if (this.choices.indexOf(selection) === this.choices.indexOf(computerChoice)) {
      this.tieRound();
    } else {
      this.loseRound();
    }
    this.endRound();
  },
  endRound: function() {
    $('#player-score').text(this.playerScore);
    $('#computer-score').text(this.computerScore);
    $('#section-3').html(this.outcome)
  },
  victory: function() {
    $('#section-4').hide();
  }
};



// Player makes selection
$(".cartoon-head").click( function() {
  event.preventDefault();
  game.scoreRound(event.target.id);
})
