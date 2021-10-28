import { combineReducers } from 'redux';
import { eventosReducer } from './eventosReducer';
import { authReducer } from './authReducer';
import {reducerCoords} from './coordsReducer';
import {authReducerG} from './authGoogle'
import { socketIoConfig } from './socketIo';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    corrdenadas: reducerCoords,
    eventos:eventosReducer,
    authGoo: authReducerG,
    socketIO: socketIoConfig,
    users: usersReducer

})