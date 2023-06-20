const contactReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CONTACT_INFO':
        return action.payload;
      default:
        return state;
    }
  };

export default contactReducer;