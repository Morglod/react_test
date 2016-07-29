import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer';
import populateTestData from './testData';
populateTestData();

const middleware = applyMiddleware(thunk, logger());

export default createStore(reducer, middleware);
