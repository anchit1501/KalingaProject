export const storeOneWayDetail=(oneWayDetail)=>{
    console.log('action',oneWayDetail);
    return{
        type: 'STORE_ONE_WAY_DETAIL',
        payload: oneWayDetail 
    }
}