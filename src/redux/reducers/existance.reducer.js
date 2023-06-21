const existanceReducer = (state = false, action) => {
    switch (action.type) {
        case 'FORM_EXIST':
            return true;
            break;
        case 'FORM_NO_EXIST':
            return false;
            break;
        default:
            return state
    }
}

export default existanceReducer