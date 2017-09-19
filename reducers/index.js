//Reducers for default actions
import actions from '../actions';
import stateCreator from '../utility/default'

export const reducer = (state = stateCreator(1), action) => {
  switch (action.type) {
    case actions.feed:
      state.feed = true;
      state.tickSinceFeed = 0;
      return state
    case actions.water:
      state.watered = true;
      state.tickSinceWater = 0;
      return state
    case actions.feelPain:
      state.health = state.health - (5 * state.difficultyValue)
      return state
    case actions.feelJoy:
      if (state.happieness < 4) {
        state.happieness++;
      }
      return state
    case actions.idle:
      state.tick++;
      state.tickSinceFeed++;
      state.tickSinceWater++;
      if (state.tickSinceFeed > 5) {
       state.health = state.health - (5 * state.difficultyValue);
       state.tick = 0;
       state.happieness--;
      }
      if (state.tickSinceWater > 10) {
       state.health = state.health - (5 * state.difficultyValue);
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

      const happyIndex = (4 * state.difficultyValue);

      if (state.tick > happyIndex) {
        state.happieness++;
      }
      return state
    default:
      return state
    }
}