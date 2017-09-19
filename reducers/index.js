//Reducers for default actions
import actions from '../actions';
import stateCreator from '../utility/default'

export const reducer = (state = stateCreator(1), action) => {
  switch (action.type) {
    case 'FEED':
      state.feed = true;
      return state
    case 'WATER':
      state.watered = true;
      return state
    case 'FEEL_PAIN':
      state.health = state.health - (5 * state.difficultyValue)
      return state
    case 'FEEL_JOY':
      if (state.happieness < 4) {
        state.happieness++;
      }
      return state
    default:
      return state
    }
}