const applicationReducer = (state = {id: null}, action) => {
  switch (action.type) {
    case 'SET_APP_INFO':
      return action.payload;
    default:
      return state;
  }
};



export default applicationReducer;