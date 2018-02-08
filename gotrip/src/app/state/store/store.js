import {createStore,combineReducers,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import {reducer as formReducer} from 'redux-form';

import FlightSearchReducer from '../reducer/FlightSearchReducer';
import OneWayFlightDetail from '../reducer/OneWayFlightDetail';


export default createStore(combineReducers({FlightSearchReducer,OneWayFlightDetail}),{
    // OneWayResult:false
},applyMiddleware(logger,thunk));    