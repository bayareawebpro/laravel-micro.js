import {AppServiceProvider, ConfigServiceProvider, RequestServiceProvider} from "laralite"
import VueServiceProvider from "./Vue/VueServiceProvider"
import SwapableServiceProvider from "./SwabableService/SwapableServiceProvider"
export default [
    AppServiceProvider,
    ConfigServiceProvider,
    RequestServiceProvider,
    VueServiceProvider,
    SwapableServiceProvider
]