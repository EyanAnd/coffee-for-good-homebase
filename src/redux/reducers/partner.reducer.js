const partnerReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_PARTNER":
            return action.payload
        default:
            return state;
    }
}

export default partnerReducer;