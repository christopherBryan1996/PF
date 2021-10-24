import { combineReducers } from 'redux';
import { eventosReducer } from './eventosReducer';
import { authReducer } from './authReducer';
import {reducerCoords} from './coordsReducer';
import {authReducerG} from './authGoogle'
import { socketIoConfig } from './socketIo';

export const rootReducer = combineReducers({
    auth: authReducer,
    corrdenadas: reducerCoords,
    eventos:eventosReducer,
    authGoo: authReducerG,
    socketIO: socketIoConfig
})