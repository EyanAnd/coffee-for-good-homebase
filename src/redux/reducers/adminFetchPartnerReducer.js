// sets store for the partner
const adminFetchPartnerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTNERS':
            return action.payload
        default:
            return state;
    }
}

export default adminFetchPartnerReducer;