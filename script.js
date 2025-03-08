
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function validateChoice(choice) {
  const validChoices = ["rock", "paper", "scissors"];
  return validChoices.includes(choice.toLowerCase());
}

function playRound(humanChoice, computerChoice) {
  if (computerChoice === humanChoice) {
    return "Tie!";
  } else if (
    (computerChoice === "rock" && humanChoice === "scissors") ||
    (computerChoice === "scissors" && humanChoice === "paper") ||
    (computerChoice === "paper" && humanChoice === "rock")
  ) {
    return `You lost this round! ${capitalize(computerChoice)} beats ${humanChoice}.`;
  } else {
    return `You win this round! ${capitalize(humanChoice)} beats ${computerChoice}.`;
  }
}

let humanScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
const maxRounds = 5;

function updateUI(result) {
  document.getElementById('roundResult').textContent = result;
  document.getElementById('humanScore').textContent = humanScore;
  document.getElementById('computerScore').textContent = computerScore;

  if (roundsPlayed >= maxRounds) {
    let finalResult;
    if (humanScore > computerScore) {
      finalResult = `Game over! You win ${humanScore}-${computerScore}!`;
    } else if (computerScore > humanScore) {
      finalResult = `Game over! Computer wins ${computerScore}-${humanScore}!`;
    } else {
      finalResult = `Game over! It's a tie ${humanScore}-${computerScore}!`;
    }
    document.getElementById('gameResult').textContent = finalResult;
  }
}

function handleSubmission() {
  if (roundsPlayed >= maxRounds) return;

  const inputField = document.getElementById('playerChoice');
  const humanChoice = inputField.value.toLowerCase().trim();
  const errorField = document.getElementById('inputError');

  if (!validateChoice(humanChoice)) {
    errorField.textContent = "Please enter 'rock', 'paper', or 'scissors'";
    return;
  }

  // Clear any previous error and input field
  errorField.textContent = "";
  inputField.value = "";

  roundsPlayed++;
  const computerChoice = getComputerChoice();
  const result = playRound(humanChoice, computerChoice);

  if (result.includes("win")) {
    humanScore++;
  } else if (result.includes("lost")) {
    computerScore++;
  }

  updateUI(result);
}

// Add event listeners
document.getElementById('submitBtn').addEventListener('click', handleSubmission);
