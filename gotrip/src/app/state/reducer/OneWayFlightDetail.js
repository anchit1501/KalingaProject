const OneWayFlightDetail = (state = {
    OneWayFlightDetail: false,
    lastValues: []
}, action) => {
    switch (action.type) {

        case 'STORE_ONE_WAY_DETAIL':
        // console.log("reducerWorking");
            state = {
                ...state,
                OneWayFlightDetail: action.payload,
                // lastValues: [...state.lastValues, action.payload]
            }
            // console.log("working");
            break;
        
        

    }
    return state;
}
export default OneWayFlightDetail;