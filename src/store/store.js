import {createStore, compose, applyMiddleware} from 'redux';
import  {rootReducer}  from '../reducers/rootReducer';
import {reducerCoords} from '../reducers/coordsReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' 


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose ;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authGoo','notificaciones']
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    ),

)


export const persistedStore = persistStore(store)
