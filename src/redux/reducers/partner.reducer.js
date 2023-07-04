const partnerReducer = (state = [], action) => { // sets the partner info to be accessed and viewed on the front end.
    switch (action.type) {
        case "SET_PARTNER":
            return action.payload
        default:
            return state;
    }
}

export default partnerReducer;