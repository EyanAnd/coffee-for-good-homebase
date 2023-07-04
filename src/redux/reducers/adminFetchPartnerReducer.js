// sets store for the partner
const adminFetchPartnerReducer = (state = {}, action) => { // gets all of the current partners for the admin to send reports to 
    switch (action.type) {
        case 'SET_PARTNERS':
            return action.payload
        default:
            return state;
    }
}

export default adminFetchPartnerReducer;