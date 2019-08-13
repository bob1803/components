
//import './reset.less'
import * as ReactDom from 'react-dom'
import { App } from './components/app.jsx'
//import {queryStringToObject} from './helpers'
import * as React from 'react'
//import { appState } from './app-state.js'
//import { Provider } from 'mobx-react'
//import { initDataFetcher } from './data-fetcher'

const appNode = document.getElementById('app');


ReactDom.render(
    <App/>
, appNode);

module.hot.accept();