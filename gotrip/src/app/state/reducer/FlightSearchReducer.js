const FlightSearchReducer = (state = {name:'muzammil',
ShowOneWayResult:false,
lastValues: []
}, action) => {
    switch (action.type) {

        case 'STORE_ONE_WAY':
            state = {
                ...state,
                OneWaySearch: action.payload,
                // lastValues: [...state.lastValues, action.payload]
            }
            break;
        case 'SHOW_ONE_WAY_RESULT':
            state = {
                ...state,
                OneWayResult: action.payload,
                // lastValues: [...state.lastValues, action.payload]
            }
            break;
        case 'STORE_ROUND_TRIP_INBOUND' :
            state={
                ...state,
                RoundTripResultInbound: action.payload,
            }
            break;
        case 'STORE_ROUND_TRIP_OUTBOUND' :
            state={
                ...state,
                RoundTripResultOutbound: action.payload,
            }
            break;
        case 'STORE_BOOKING_ID' :
            state={
                ...state,
                BookingSummary: action.payload,
            }
            break;
    }
    return state;
}
export default FlightSearchReducer;