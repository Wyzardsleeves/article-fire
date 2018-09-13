import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import searchReducer from './reducers/searchReducer';
import articlesReducer from './reducers/articlesReducer';

import {combineReducers, createStore} from 'redux';
import{Provider} from 'react-redux';

const allReducers = combineReducers({
  articles: articlesReducer,
  search: searchReducer
});

const store = createStore(
  allReducers, {  //might want to get rid of inital state
    articles: [{name: 'Amazon buys WholeFoods'}],
    search: ''
  },
  window.devToolsExtension && window.devToolsExtension()
);

console.log(store.getState());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
