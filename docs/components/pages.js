webpackJsonp([0,2],[,,,,,,,,,,,,,,,,,function(t,e,s){var a=s(14)(s(74),s(75),!1,null,null,null);t.exports=a.exports},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,s){var a=s(14)(s(76),s(77),!1,null,null,null);t.exports=a.exports},function(t,e,s){var a=s(14)(s(78),s(79),!1,null,null,null);t.exports=a.exports},function(t,e,s){var a=s(14)(s(80),s(81),!1,null,null,null);t.exports=a.exports},function(t,e,s){var a=s(14)(s(84),s(85),!1,function(t){s(82)},null,null);t.exports=a.exports},function(t,e,s){var a=s(14)(s(86),s(87),!1,null,null,null);t.exports=a.exports},function(t,e,s){var a=s(14)(s(88),s(89),!1,null,null,null);t.exports=a.exports},function(t,e,s){var a=s(14)(s(90),s(91),!1,null,null,null);t.exports=a.exports},function(t,e,s){var a=s(14)(s(92),s(93),!1,null,null,null);t.exports=a.exports},function(t,e,s){var a=s(14)(s(94),s(95),!1,null,null,null);t.exports=a.exports},,,,,,,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={created:function(){}}},function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("router-view")},staticRenderFns:[]}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Homepage",computed:{talkingPoints:function(){return[{color:"purple",icon:"fa fa-cubes",title:"Container",desc:"The IOC Container can read arguments and construct concrete instances from callbacks and class bindings.",examples:[{name:"Binding",import:"binding",hash:"binding"},{name:"Make",import:"make",hash:"make"},{name:"Injection",import:"injection",hash:"injection"}]},{color:"orange",icon:"fa fa-hand-holding",title:"Service Providers",desc:"A Laravel-like Service Locator is built for A/B Testing from the ground up.",examples:[{name:"Provider",import:"provider",hash:"provider"},{name:"Registration",import:"providerRegister",hash:"register"},{name:"Async",import:"async",hash:"async"}]},{color:"#e3342f",icon:"fa fa-layer-group",title:"Middleware Pipeline",desc:"The middleware pipeline provides a flexible solution for simplifying in-app requests.",examples:[{name:"Pipe",import:"middleware",hash:"middleware"},{name:"Kernel",import:"kernel",hash:"kernel"},{name:"Router",import:"router",hash:"router"},{name:"App",import:"app",hash:"app"}]},{color:"#f85443",icon:"fab fa-laravel",title:"Inspired by Laravel",desc:"Created for Web Artisans",examples:[],link:"laravel.com"},{color:"#6cb2eb",icon:"fab fa-linkedin",title:"Designed by Daniel Alvidrez",desc:"Made with ♥️in the SF, Bay Area",examples:[],link:"linkedin.com/in/danalvidrez"}]}},created:function(){this.events=this.$app.make("Events")}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"pt-4 pb-4 d-flex flex-column justify-content-center align-items-center"},[s("v-logo",{attrs:{size:160,type:"big"}}),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),s("div",{staticClass:"mt-3"},t._l(t.talkingPoints,function(e,a){return s("div",{staticClass:" animated fadeIn",style:"animation-delay: "+(300*a+200)+"ms"},[s("div",{staticClass:"card shadow-sm text-center mb-3"},[s("div",{staticClass:"card-body pt-4 pb-3 pl-3 pr-3"},[s("p",{staticClass:"card-text m-0 mb-2"},[s("i",{class:"fa-2x "+e.icon,style:"color: "+e.color}),t._v(" "),s("br"),t._v(t._s(e.title)+"\n\t\t\t\t\t\t")]),t._v(" "),s("p",{staticClass:"small"},[t._v(t._s(e.desc))])]),t._v(" "),e.link||e.examples?s("div",{staticClass:"card-footer"},[e.link?s("a",{staticClass:"btn btn-sm btn-outline-secondary",attrs:{href:"//"+e.link,target:"_blank"}},[t._v("\n\t\t\t\t\t\t\t"+t._s(e.link)+"\n\t\t\t\t\t\t")]):t._e(),t._v(" "),e.examples&&e.examples.length?s("button",{staticClass:"btn btn-sm btn-outline-secondary",on:{click:function(e){t.events.$emit("point"+a)}}},[t._v("\n\t\t\t\t\t\t\tSee example\n\t\t\t\t\t\t")]):t._e()]):t._e()])])}))],1),t._v(" "),t._l(t.talkingPoints.filter(function(t){return t.examples}),function(e,a){return s("v-modal",{key:a,attrs:{value:-1===a,title:e.title,event:"point"+a,fullscreen:!0}},[s("v-tabs",{staticClass:"rounded-0 h-100",staticStyle:{"overflow-y":"scroll","overflow-x":"hidden","background-color":"#2b2b2b"},attrs:{tabs:e.examples,"no-hash":!0}},[t._l(e.examples,function(t,e){return s("template",{slot:t.hash},[s("v-code",{key:e,staticClass:"h-100",attrs:{import:t.import}})],1)})],2),t._v(" "),s("template",{slot:"footer"},[s("div",{staticClass:"small text-center text-muted"},[s("small",[t._v("© Copyright Dan Alvidrez - All Rights Reserved.")])])])],2)})],2)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{staticClass:"text-dark m-0 animated zoomInLeft"},[this._v("\n\t\t\tLaravel"),e("span",{staticClass:"text-primary"},[this._v("Micro")]),this._v(".js\n\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"animated fadeInUp text-center"},[e("p",{staticClass:"lead text-muted"},[this._v("A Javascript based IOC Container for Web Artisans ")]),this._v(" "),e("p",{staticClass:"mt-2"},[e("code",{staticClass:"bg-dark text-light rounded p-1"},[this._v("artisan make:micro")])])])}]}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"About"}},function(t,e){t.exports={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body text-center"},[s("h3",{staticClass:"text-primary"},[t._v("About this Site")]),t._v(" "),s("p",{staticClass:"lead"},[t._v("\n\t\t\t\tThis site is an example of what you can build with this library.\n\t\t\t")]),t._v(" "),s("ul",{staticClass:"list-unstyled"},[s("li",[t._v("The loading sequences are for enjoyment only.")]),t._v(" "),s("li",[t._v("All of the data shown is accurate and provided by the LaravelMicro container.")]),t._v(" "),s("li",[t._v("To use these components in your project, simply copy them from the github repository."),s("br"),t._v("\n\t\t\t\t\t(Installing with NPM will only provide the core library files.)\n\t\t\t\t")])])]),t._v(" "),s("div",{staticClass:"card-footer text-center"},[s("a",{staticClass:"btn btn-primary",attrs:{target:"_blank",href:"https://github.com/bayareawebpro/laravel-micro.js/tree/master/docs-src/js"}},[s("i",{staticClass:"fa fa-arrow-alt-circle-right"}),t._v(" View Components\n\t\t\t")]),t._v(" "),s("form",{staticClass:"d-inline-block mt-2 mb-sm-0",attrs:{action:"https://www.paypal.com/cgi-bin/webscr",method:"post",target:"_blank"}},[s("input",{attrs:{type:"hidden",name:"business",value:"dan@bayareawebpro.com"}}),t._v(" "),s("input",{attrs:{type:"hidden",name:"cmd",value:"_donations"}}),t._v(" "),s("input",{attrs:{type:"hidden",name:"item_name",value:"WP Lumen Framework"}}),t._v(" "),s("input",{attrs:{type:"hidden",name:"item_number",value:"Developer Donation"}}),t._v(" "),s("input",{attrs:{type:"hidden",name:"currency_code",value:"USD"}}),t._v(" "),s("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"submit",name:"submit"}},[s("i",{staticClass:"fa fa-coffee"}),t._v(" Buy me a Coffee 🤖💤\n\t\t\t\t")]),t._v(" "),s("img",{attrs:{alt:"",width:"1",height:"1",src:"https://www.paypalobjects.com/en_US/i/scr/pixel.gif"}})])])])])}]}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Dashboard",data:function(){return{status:this.getAppStats()}},methods:{getAppStats:function(){return Object.assign({},Object.freeze({providers:this.$app.providers}))},getRealName:function(t){var e=this.$app.getName(t);return"Window"===e?e.toLowerCase():e}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid"},[s("h2",{staticClass:"text-primary"},[t._v("Service Providers")]),t._v(" "),s("p",[t._v("Summary of the application container and loaded services.")]),t._v(" "),s("hr"),t._v(" "),s("div",{staticClass:"table-responsive bg-light shadow-sm"},[s("table",{staticClass:"table table-bordered table-striped table-sm"},[t._m(0),t._v(" "),s("tbody",t._l(t.status.providers,function(e,a){return s("tr",[s("th",{staticClass:"font-weight-bold",attrs:{scope:"row"}},[t._v(t._s(a))]),t._v(" "),s("td",[t._v(t._s(e.provides.join(", ")))]),t._v(" "),s("td",[e.isDeferred&&!e.isBooted?s("div",[s("i",{staticClass:"fa fa-clock text-secondary"}),t._v(" Deferred\n\t\t\t\t\t")]):s("div",[s("i",{staticClass:"fa fa-check-circle text-success"}),t._v(" Booted\n\t\t\t\t\t")])])])}))])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("Name")]),this._v(" "),e("th",[this._v("Provides")]),this._v(" "),e("th",[this._v("Status")])])])}]}},function(t,e,s){var a=s(83);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(16)("610f944b",a,!0,{})},function(t,e,s){(t.exports=s(15)(!1)).push([t.i,".scrollable{z-index:0;padding:5px 0;background:#2b2b2b}.scrollable .list-group-item{font-size:12px;padding:2px 10px;color:aqua!important;background:transparent}.scrollable .list-group-item:first-of-type{border-top:none}.scrollable .list-group-item:last-of-type{border-bottom:none}",""])},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Dashboard",methods:{flush:function(){this.$app.logOutput=[],this.$forceUpdate()}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"flex-row flex-grow-0"},[s("button",{staticClass:"btn btn-secondary btn-sm float-right",on:{click:t.flush}},[t._v("Flush")]),t._v(" "),s("h2",{staticClass:"text-primary"},[t._v("Logs")]),t._v(" "),s("p",[t._v("Summary of the application container and loaded services.")])]),t._v(" "),s("div",{ref:"scrollable",staticClass:"list-group scrollable border rounded"},[0===t.$app.logOutput.length?s("div",{staticClass:"list-group-item border-left-0 border-right-0"},[t._v("\n\t\t\tNothing to show.\n\t\t")]):t._l(t.$app.logOutput,function(e,a){return s("div",{staticClass:"list-group-item border-left-0 border-right-0"},[t._v("\n\t\t\t"+t._s(e.toString())+"\n\t\t")])})],2)])},staticRenderFns:[]}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Dashboard",data:function(){return{status:this.getAppStats(),form:{key:"",value:null}}},methods:{toggleEnv:function(t){this.config.set("env",t),this.config.set("debug","production"!==t),this.$app.debug("production"!==t)},setConfig:function(){if(!this.form.key||!this.form.value)return this.$root.toast({title:"Whoops",body:"Key / Value Pair not filled.",type:"error"});try{this.config.set(this.form.key,JSON.parse(this.form.value))}catch(t){this.config.set(this.form.key,this.form.value)}this.$root.toast({title:"Config Updated",body:this.form.key+" was set successfully.",type:"success"}),this.$forceUpdate()},getAppStats:function(){return this.config=this.$app.make("Config"),Object.assign({},Object.freeze({config:this.config.all()}))},getButtonClasses:function(t){return{"btn-primary":this.status.config.env===t,"btn-secondary":this.status.config.env!==t}}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"p-3 w-100"},[s("h2",{staticClass:"text-primary"},[t._v("Config")]),t._v(" "),s("p",[t._v("Summary of the application container and loaded services.")]),t._v(" "),s("div",{staticClass:"btn-group btn-group-toggle btn-group-sm"},[s("button",{staticClass:"btn",class:t.getButtonClasses("development"),attrs:{disabled:"development"===t.status.config.env},on:{click:function(e){t.toggleEnv("development")}}},[t._v("Development\n\t\t")]),t._v(" "),s("button",{staticClass:"btn",class:t.getButtonClasses("production"),attrs:{disabled:"production"===t.status.config.env},on:{click:function(e){t.toggleEnv("production")}}},[t._v("Production\n\t\t")])]),t._v(" "),s("br"),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"input-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.key,expression:"form.key"}],staticClass:"form-control mr-2",attrs:{placeholder:"dot.syntax.key"},domProps:{value:t.form.key},on:{input:function(e){e.target.composing||t.$set(t.form,"key",e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.value,expression:"form.value"}],staticClass:"form-control",attrs:{placeholder:"value"},domProps:{value:t.form.value},on:{input:function(e){e.target.composing||t.$set(t.form,"value",e.target.value)}}}),t._v(" "),s("div",{staticClass:"input-group-append"},[s("button",{staticClass:"btn btn-secondary",on:{click:t.setConfig}},[t._v("Set")])])]),t._v(" "),s("hr"),t._v(" "),s("div",{staticClass:"table-responsive bg-light shadow-sm",staticStyle:{overflow:"auto"}},[s("table",{staticClass:"table table-bordered table-striped table-sm m-0"},[t._m(0),t._v(" "),s("tbody",t._l(t.status.config,function(e,a){return s("tr",[s("th",[t._v(t._s(a))]),t._v(" "),s("td",{attrs:{width:"99%"}},[s("pre",{staticClass:"border rounded p-2 m-0",staticStyle:{color:"aqua",background:"#2b2b2b"}},[t._v(t._s(e))])])])}))])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("Key")]),this._v(" "),e("th",[this._v("Value")])])])}]}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Dashboard",data:function(){return{status:this.getAppStats()}},methods:{getAppStats:function(){return{sharedWith:this.$app.sharedWith,sharable:this.$app.sharable}},getRealName:function(t){var e=this.$app.getName(t);return"Window"===e?e.toLowerCase():e},share:function(t){this.$app.share(t).withOthers(window),this.$forceUpdate()},unShare:function(t){this.$app.unShare(t),this.$forceUpdate()}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid"},[s("h2",{staticClass:"text-primary"},[t._v("Shared")]),t._v(" "),s("p",[t._v("Tracked Shared References to Services.")]),t._v(" "),s("div",{staticClass:"table-responsive bg-light shadow-sm"},[s("table",{staticClass:"table table-bordered table-striped table-sm"},[t._m(0),t._v(" "),s("tbody",t._l(t.status.sharable,function(e,a){return s("tr",[s("th",[t._v(t._s(e))]),t._v(" "),s("td",[s("ul",{staticClass:"m-0 pl-4"},t._l(t.status.sharedWith[e],function(a){return s("li",[t._v("\n\t\t\t\t\t\t\t"+t._s(t.$app.getName(a))+": "),s("code",[t._v(t._s(t.getRealName(a))+"."+t._s(t.$app.getSharedAliasName(e))+"()")])])}))]),t._v(" "),s("td",{staticStyle:{"max-width":"50px"}},[t.status.sharedWith[e]?s("button",{staticClass:"btn btn-secondary btn-sm",on:{click:function(s){t.unShare(e)}}},[t._v("Revoke")]):s("button",{staticClass:"btn btn-primary btn-sm",on:{click:function(s){t.share(e)}}},[t._v("Share")])])])}))])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("Alias")]),this._v(" "),e("th",[this._v("Shared With")]),this._v(" "),e("th",[this._v("Actions")])])])}]}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Dashboard",data:function(){return{status:this.getAppStats()}},methods:{getAppStats:function(){return Object.assign({},Object.freeze({bindings:this.$app.bindings}))}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid"},[s("h2",{staticClass:"text-primary"},[t._v("Services")]),t._v(" "),s("p",[t._v("Summary of the application container and loaded services.")]),t._v(" "),s("hr"),t._v(" "),s("h5",[t._v("Service Bindings")]),t._v(" "),s("div",{staticClass:"table-responsive bg-light shadow-sm"},[s("table",{staticClass:"table table-bordered table-striped table-sm"},[t._m(0),t._v(" "),s("tbody",t._l(t.status.bindings,function(e,a){return s("tr",[s("th",[s("i",{staticClass:"fa fa-cube text-secondary"}),t._v(" "+t._s(a))]),t._v(" "),s("td",[t.$app.isResolved(a)?s("div",[s("i",{staticClass:"fa fa-microchip text-success"}),t._v(" Resolved\n\t\t\t\t\t")]):s("div",[t.$app.canShare(a)?s("div",[s("i",{staticClass:"fa fa-user-clock text-muted"}),t._v(" UnInstantiated\n\t\t\t\t\t\t")]):s("div",[s("i",{staticClass:"fa fa-magic text-warning"}),t._v(" New Instance Always\n\t\t\t\t\t\t")])])]),t._v(" "),s("td",[t.$app.isConcrete(a)?s("div",[s("i",{staticClass:"fa fa-microchip text-muted"}),t._v(" Concrete\n\t\t\t\t\t")]):t.$app.isClass(a)?s("div",[s("i",{staticClass:"fa fa-clone text-muted"}),t._v(" Class\n\t\t\t\t\t")]):s("div",[s("i",{staticClass:"fa fa-code text-muted"}),t._v(" Callback\n\t\t\t\t\t")])]),t._v(" "),s("td",[t.$app.canShare(a)?s("div",[s("i",{staticClass:"fa fa-code-branch text-info"}),t._v(" Yes\n\t\t\t\t\t")]):s("div",[s("i",{staticClass:"fa fa-ban text-danger"}),t._v(" No\n\t\t\t\t\t")])])])}))])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("Alias")]),this._v(" "),e("th",[this._v("Status")]),this._v(" "),e("th",[this._v("Type")]),this._v(" "),e("th",[this._v("Shareable")])])])}]}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{service:this.$app.make("ServiceInstance")}},methods:{swapImplementation:function(){var t=this.$app.make("swapper");this.service=t(this.service)},change:function(){document.documentElement.style.setProperty("--primary",this.service.content)}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"p-3"},[t._m(0),t._v(" "),s("p",{staticClass:"text-muted"},[t._v("\n\t\tThis example demonstrates how you can persist state across multiple\n\t\timplementations as they are swapped by a service provider.\n\t")]),t._v(" "),s("p",{staticClass:"text-muted"},[s("i",{staticClass:"fa fa-info-circle"}),t._v("\n\t\tCheck the "),s("router-link",{attrs:{to:"/logs"}},[t._v("Logs")]),t._v(" to see the output of the processes as you swap implementations.\n\t\tUsing the async binding method shown in the example on the homepage you can import bindings from remote servers.\n\t")],1),t._v(" "),t.service?s("div",[s("p",{staticClass:"text-muted"},[t._v("Current Version: "+t._s(t.service.getVersion()))]),t._v("\n\t\t"+t._s(t.service.fieldLabel)+"\n\t\t"),"checkbox"===t.service.fieldType?s("input",{directives:[{name:"model",rawName:"v-model",value:t.service.content,expression:"service.content"}],staticClass:"form-control",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.service.content)?t._i(t.service.content,null)>-1:t.service.content},on:{change:[function(e){var s=t.service.content,a=e.target,n=!!a.checked;if(Array.isArray(s)){var i=t._i(s,null);a.checked?i<0&&t.$set(t.service,"content",s.concat([null])):i>-1&&t.$set(t.service,"content",s.slice(0,i).concat(s.slice(i+1)))}else t.$set(t.service,"content",n)},t.change]}}):"radio"===t.service.fieldType?s("input",{directives:[{name:"model",rawName:"v-model",value:t.service.content,expression:"service.content"}],staticClass:"form-control",attrs:{type:"radio"},domProps:{checked:t._q(t.service.content,null)},on:{change:[function(e){t.$set(t.service,"content",null)},t.change]}}):s("input",{directives:[{name:"model",rawName:"v-model",value:t.service.content,expression:"service.content"}],staticClass:"form-control",attrs:{type:t.service.fieldType},domProps:{value:t.service.content},on:{change:t.change,input:function(e){e.target.composing||t.$set(t.service,"content",e.target.value)}}})]):t._e(),t._v(" "),s("hr"),t._v(" "),s("button",{staticClass:"btn btn-primary",on:{click:t.swapImplementation}},[t._v("\n\t\tSwap Implementation\n\t")]),t._v(" "),s("hr"),t._v(" "),s("h4",[t._v("Swapable Service Component")]),t._v(" "),s("v-code",{staticStyle:{height:"330px",overflow:"hidden"},attrs:{import:"swapD"}}),t._v(" "),s("hr"),t._v(" "),s("h4",[t._v("Swapable Service Abstract")]),t._v(" "),s("p"),t._v(" "),s("v-code",{staticStyle:{height:"440px",overflow:"hidden"},attrs:{import:"swapA"}}),t._v(" "),s("hr"),t._v(" "),s("h4",[t._v("Service Implementations")]),t._v(" "),s("v-code",{staticStyle:{height:"400px",overflow:"hidden"},attrs:{import:"swapB"}}),t._v(" "),s("hr"),t._v(" "),s("h4",[t._v("Swapable Service Provider")]),t._v(" "),s("v-code",{staticStyle:{height:"960px",overflow:"hidden"},attrs:{import:"swapC"}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("h3",[e("i",{staticClass:"fa fa-retweet"}),this._v(" Swapable Service ")])}]}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"404"}},function(t,e){t.exports={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"d-flex justify-content-center align-items-center h-100"},[e("div",{staticClass:"m-3 d-block text-primary text-center"},[e("i",{staticClass:"fa fa-exclamation-circle fa-2x"}),e("br"),this._v("\n\t\tWhoops, nothing here.\n\t")])])}]}}]);