const adminReportsReducer = (state = [], action) => {
switch (action.type) {
    case 'SET_REPORTS':
        return action.payload

    default:
        return state;
}
}

export default adminReportsReducer