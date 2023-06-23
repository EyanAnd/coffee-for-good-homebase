// set the state to an id of null to have one start when someone creates a new account
const applicationReducer = (state = {id: null}, action) => {
  switch (action.type) {
    case 'SET_APP_INFO':
      return action.payload;
    default:
      return state;
  }
};



export default applicationReducer;