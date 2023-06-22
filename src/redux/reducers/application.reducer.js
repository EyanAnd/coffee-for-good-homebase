const applicationReducer = (state = {id: null}, action) => {
  switch (action.type) {
    case 'SET_APP_INFO':
      return action.payload;
    default:
      return state;
  }
};

const adminApplicationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_APPS':
      return [...state, action.payload]
   
  
    default:
      return state;
  }
}


export default applicationReducer;