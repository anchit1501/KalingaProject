export const storeOneWay=(oneWay)=>{
    return{
        type: 'STORE_ONE_WAY',
        payload: oneWay 
    }
}
export const showOneWayResult=(show)=>{
    return{
        type: 'SHOW_ONE_WAY_RESULT',
        payload: show
    }
}
export const storeRoundTripInbound=(roundTrip)=>{
    return {
        type: 'STORE_ROUND_TRIP_INBOUND',
        payload: roundTrip
    }
}
export const storeRoundTripOutbound=(roundTrip)=>{
    return {
        type: 'STORE_ROUND_TRIP_OUTBOUND',
        payload: roundTrip
    }
}
export const storeBookingId=(booking)=>{
    return {
        type: 'STORE_BOOKING_ID',
        payload: booking
    }
}