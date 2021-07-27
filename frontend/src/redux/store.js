import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import rootReducers from './rootReducer';

const composeEnhancers =
 (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
 window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
 trace: true,
 traceLimit: 25
 })) ||
 compose;

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__() || compose;

// const enhancers = [composeEnhancers(applyMiddleware(...middleware))];
const store = createStore(rootReducers,composeEnhancers( applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;
    

//  const store=createStore(allreducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
