import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker' ;
import {Provider } from 'react-redux';
import {reducer} from './reducer /reducer' ;
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore , persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './Router.js' ;

const persistConfig = {
    key : 'root',
    storage
}

const allComposeEnhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistedReducer = persistReducer(persistConfig,reducer)

export let store = createStore(persistedReducer,allComposeEnhancer) ;
let persistor = persistStore(store) ;

ReactDOM.render(
<Provider store={store}>
    <PersistGate loading={true} persistor={persistor}>
        <Router />
    </PersistGate>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
