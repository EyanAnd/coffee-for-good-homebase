const adminApplicationReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_APPS':
        return action.payload
      default:
        return state;
    }
  }

export default adminApplicationReducer;