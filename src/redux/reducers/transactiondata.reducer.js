const transactionDataReducer = (state = {}, action) => { // sets the store for the admin and partner home page
    switch (action.type) {
        case 'SET_DATA':
            return action.payload
        default:
            return state;
    }
}

export default transactionDataReducer;