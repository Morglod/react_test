import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import Base from './components/Base';
import ViewMainLayout from './components/ViewMainLayout';
import ViewEntryLayout from './components/ViewEntryLayout';
import NotFoundLayout from './components/NotFoundLayout';

import store from './store';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' store={store} component={Base}>
            <IndexRoute component={ViewMainLayout} />
            <Route path='entry/:entryId' component={ViewEntryLayout} />
        </Route>
        <Route path='*' component={NotFoundLayout}></Route>
    </Router>
, document.getElementById('app-layout'));
