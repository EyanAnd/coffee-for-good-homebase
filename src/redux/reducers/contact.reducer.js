const contactReducer = (state = [], action) => { // sets the contact info for the contact form to be able to send it to the backend
    switch (action.type) {
      case 'SET_CONTACT_INFO':
        return [...state, action.payload]
      default:
        return state;
    }
  };

export default contactReducer;