import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import {reducerCoords} from './coordsReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    corrdenadas: reducerCoords,
})