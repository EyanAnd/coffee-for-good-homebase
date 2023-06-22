const adminApplicationReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_APPS':
        return [...state, action.payload]
      default:
        return state;
    }
  }

export default adminApplicationReducer;