import {store} from "./store/store"
import { ConfigBlock } from "./component/configBlock"
import { Provider } from "react-redux"
import ReactDOM  from "react-dom"
import React from "react"
import { fetchInit } from "./store/appSlice"
import "./template/js/event.js"  //import just for side effect
import { loadCrawler } from "./mod_source/index.mjs"
console.log(store)

store.dispatch(fetchInit())
window.load=loadCrawler
ReactDOM.render(
    <Provider store={store}>
        <ConfigBlock configType="source"/>
    </Provider>,
    document.querySelector("#sourceRoot")
)

