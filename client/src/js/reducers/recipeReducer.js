export default (state = {}, action) => {
  switch (action.type) {
      case 'RECIPES':
          return {
              ...state,
              recipe: action.payload
          }

      default:
          return state;
  }
};