require "sinatra"
require "shotgun"
require "json"
require "pry"

class Game
  attr_accessor :outcome

  def initialize
    @round = 1
    @player_score = 0
    @computer_score = 0
    @outcome = "<p>Choose your officer!</p>"
  end

  def computer_chooses
    @round += 1
    ["Kirk", "Spock", "Bones"].sample
  end

  def pick_kirk
    case computer_chooses
    when "Kirk"
      tie_round
    when "Spock"
      kirk_vs_spock
      win_round
    when "Bones"
      bones_vs_kirk
      lose_round
    end
  end

  def pick_spock
    case computer_chooses
    when "Kirk"
      kirk_vs_spock
      lose_round
    when "Spock"
      tie_round
    when "Bones"
      spock_vs_bones
      win_round
    end
  end

  def pick_bones
    case computer_chooses
    when "Kirk"
      win_round
    when "Spock"
      spock_vs_bones
      lose_round
    when "Bones"
      bones_vs_kirk
      tie_round
    end
  end

  def kirk_vs_spock
    @outcome = "<p>Kirk fascinates Spock.\nRound #{@round}."
  end

  def spock_vs_bones
    @outcome = "<p>Spock irks Bones.\nRound #{@round}."
  end

  def bones_vs_kirk
    @outcome = "<p>Bones sasses Kirk.\nRound #{@round}."
  end

  def win_round
    @player_score += 1
    @outcome << " You win.</p>"
  end

  def lose_round
    @computer_score += 1
    @outcome << " You lose.</p>"
  end

  def tie_round
    @outcome = "<p>Transporter duplicate! A tie.</p>."
  end

  def round_data
    {
      player_score: @player_score,
      computer_score: @computer_score,
      outcome: @outcome,
      round: "<p>Round #{@round}.</p>"
    }
  end

end


game = Game.new


get "/" do
  game.outcome = "Test"
  erb :index #, locals: {game: game.round_data}
end

get "/game.json" do
  content_type :json
  game.round_data.to_json
end

post "/game.json" do
  if params[:name] == "kirk"
    game.pick_kirk
  elsif params[:name] == "spock"
    game.pick_spock
  elsif params[:name] == "bones"
    game.pick_bones
  end
end
