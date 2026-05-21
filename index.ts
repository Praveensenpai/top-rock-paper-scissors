enum Choice {
  Rock = "Rock",
  Paper = "Paper",
  Scissor = "Scissor",
}

const logChoose = (hC: Choice, cC: Choice, score: Score) => {
  console.log("Human Chose: ", hC);
  console.log("Computer Chose: ", cC);
  console.log("Score: ");
  console.log("Human: ", score.Human);
  console.log("Computer: ", score.Computer);
};

type Score = {
  Human: number;
  Computer: number;
};
const getComputerChoice = (): Choice => {
  const choices = Object.values(Choice);
  const choice = choices[Math.floor(Math.random() * choices.length)];
  return choice!;
};

const getHumanChoice = (): Choice => {
  const choicePrompt = prompt(`Choices:
    R. Rock
    P. Paper
    S. Scissor
Choose:`);

  switch (choicePrompt!) {
    case "R":
      return Choice.Rock;
    case "P":
      return Choice.Paper;
    case "S":
      return Choice.Scissor;
    default:
      throw new Error("Invalid choice");
  }
};

const playRound = (
  humanChoice: Choice,
  computerChoice: Choice,
  score: Score,
) => {
  if (humanChoice === computerChoice) {
    console.log("Draw: Both chose - ", humanChoice);
  } else if (humanChoice === Choice.Rock) {
    if (computerChoice === Choice.Paper) {
      score.Computer++;
      console.log("Computer Wins!");
      logChoose(humanChoice, computerChoice, score);
    } else if (computerChoice === Choice.Scissor) {
      score.Human++;
      console.log("Human Wins!");
      logChoose(humanChoice, computerChoice, score);
    }
  } else if (humanChoice === Choice.Paper) {
    if (computerChoice === Choice.Rock) {
      console.log("Human Wins!");
      score.Human++;
      logChoose(humanChoice, computerChoice, score);
    } else if (computerChoice === Choice.Scissor) {
      console.log("Computer Wins!");
      score.Computer++;
      logChoose(humanChoice, computerChoice, score);
    }
  } else if (humanChoice === Choice.Scissor) {
    if (computerChoice === Choice.Rock) {
      console.log("Computer Wins!");
      score.Computer++;
      logChoose(humanChoice, computerChoice, score);
    } else if (computerChoice === Choice.Paper) {
      console.log("Human Wins!");
      score.Human++;
      logChoose(humanChoice, computerChoice, score);
    }
  }
};

const playGame = (round: number) => {
  const score: Score = {
    Human: 0,
    Computer: 0,
  };
  for (let i = 0; i < round; i++) {
    let humanChoice;
    const computerChoice = getComputerChoice();
    try {
      humanChoice = getHumanChoice();
    } catch (e) {
      console.log("Invalid User choice by default computer won.");
      score.Computer++;
      continue;
    }
    playRound(humanChoice, computerChoice, score);
  }
  logScores(score);
  if (score.Computer === score.Human) {
    console.log("Match Draw!");
  } else if (score.Computer > score.Human) {
    console.log("Computer Wins!");
  } else {
    console.log("Human Wins!");
  }
};

const logScores = (score: Score) => {
  console.log("Score: ");
  console.log("Human: ", score.Human);
  console.log("Computer: ", score.Computer);
};
const main = () => {
  playGame(5);
};

main();
