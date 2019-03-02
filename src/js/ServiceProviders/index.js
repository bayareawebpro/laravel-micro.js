import {AppServiceProvider, ConfigServiceProvider} from "laravel-micro.js"
import VueServiceProvider from "./Vue/VueServiceProvider"
import MessageServiceProvider from "./MessageService/MessageServiceProvider"
import LazyServiceProvider from "./LazyService/LazyServiceProvider"
export default [
    AppServiceProvider,
    ConfigServiceProvider,
    VueServiceProvider,
    LazyServiceProvider,
    MessageServiceProvider
]