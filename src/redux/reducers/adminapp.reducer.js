const adminApplicationReducer = (state = [], action) => { // sets the applications for the admin table
    switch (action.type) {
      case 'SET_APPS':
        return action.payload
      default:
        return state;
    }
  }

export default adminApplicationReducer;