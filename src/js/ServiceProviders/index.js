import {AppServiceProvider, ConfigServiceProvider, RequestServiceProvider} from "laravel-micro.js"
import VueServiceProvider from "./Vue/VueServiceProvider"
import SwapableServiceProvider from "./SwabableService/SwapableServiceProvider"
import AuthServiceProvider from "./Auth/AuthServiceProvider"
import MessageServiceProvider from "./MessageService/MessageServiceProvider"
import LazyServiceProvider from "./LazyService/LazyServiceProvider"
export default [
    AppServiceProvider,
    //AuthServiceProvider,
    ConfigServiceProvider,
    RequestServiceProvider,
    VueServiceProvider,
    SwapableServiceProvider,
    LazyServiceProvider,
    MessageServiceProvider
]