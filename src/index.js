import * as ReactDom from 'react-dom';
import { App } from './components/app.jsx';
require('./images/favicon.ico');
require('./styles/reset.less');
import * as React from 'react';

const appNode = document.getElementById('app');


ReactDom.render(
    <App/>
, appNode);

//module.hot.accept();