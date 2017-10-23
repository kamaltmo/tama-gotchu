const initialState = {
  alive: true,
  health: 100,
  watered: true,
  tickSinceWater: 0,
  fed: true,
  tickSinceFeed: 0,
  happieness: 2, // On a scale of 0-4
  tick: 0
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FEED':
      state.fed = true;
      state.tickSinceFeed = 0;
      return state
    case 'WATER':
      state.watered = true;
      state.tickSinceWater = 0;
      return state
    case 'FEEL_PAIN':
      state.health = state.health - 5
      return state
    case 'FEEL_JOY':
      if (state.happieness < 4) {
        state.happieness++;
      }
      return state
    case 'IDLE':
      state.tick++;
      state.tickSinceFeed++;
      state.tickSinceWater++;
      if (state.tickSinceFeed > 5) {
       state.health = state.health - 5;
       state.tick = 0;
       state.happieness--;
      }
      if (state.tickSinceWater > 10) {
       state.health = state.health - 5;
       state.tick = 0;
       state.happieness--;
      }

      if (state.health < 0) {
        state.health = 0;
      }

      if (state.happieness < 0) {
        state.happieness = 0;
      }

      if (state.health == 0) {
        state.alive = false;
      }

      const happyIndex = 4;

      if (state.tick > happyIndex) {
        state.happieness++;
      }
      return state
    default:
      return state
    }
}