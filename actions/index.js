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

export const feelPain = difficulty => {
  return {
    type: 'FEEL_PAIN',
    difficulty
  }
}

export const feelJoy = happieness => {
  return {
    type: 'FEEL_JOY',
    happieness
  }
}