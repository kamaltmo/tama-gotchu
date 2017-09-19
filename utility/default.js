// A function that creates a default state for the bot depending on difficulty

const state = {
  difficulty: "Easy",
  difficultyValue: 1,
  health: 100,
  watered: true,
  feed: true,
  happieness: 2, // On a scale of 0-4
}

export default stateCreator = (difficulty) => {
  switch (difficulty) {
    case 1:
      return state;
      break;
    case 2:
      state.difficulty = "Medium";
      state.difficultyValue = difficulty;
      state.health = 80;
      return state;
      break;
    case 3:
      state.difficulty = "Hard";
      state.difficultyValue = difficulty;
      state.health = 50;
      return state;
      break;
    default:
      return state;
      break;
  }
}