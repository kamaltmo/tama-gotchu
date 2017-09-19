//Actions to interact with the bot
export const feed = () => {
  return {
    type: 'FEED'
  }
}

export const water = () => {
  return {
    type: 'WATER'
  }
}

export const feelPain = () => {
  return {
    type: 'FEEL_PAIN',
  }
}

export const feelJoy = () => {
  return {
    type: 'FEEL_JOY',
  }
}

export const idle = () => {
  return {
    type: 'IDLE',
  }
}

export const changeDifficulty = difficulty => {
  return {
    type: 'CHANGE_DIFFICULTY',
    difficulty
  }
}