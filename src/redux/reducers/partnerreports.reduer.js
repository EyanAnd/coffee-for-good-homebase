// sets store for the partner and reports that match their partner id's
const partnerReportsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTNER_REPORTS':
            return action.payload
        default:
            return state;
    }
}

export default partnerReportsReducer;