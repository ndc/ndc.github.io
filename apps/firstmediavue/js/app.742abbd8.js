(function(e){function t(t){for(var a,i,o=t[0],c=t[1],l=t[2],d=0,f=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&f.push(r[i][0]),r[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(f.length)f.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={app:0},s=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},4678:function(e,t,n){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(e){var t=s(e);return n(t)}function s(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=s,e.exports=r,r.id="4678"},"48aa":function(e,t,n){"use strict";var a=n("f837"),r=n.n(a);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],i=(n("a4d3"),n("e01a"),n("d28b"),n("d3b7"),n("3ca3"),n("ddb0"),"firstmediaVue.settings"),o={isSettingsValid:function(e){if(!e)return!1;if(!(e.FavSets instanceof Array))return!1;var t=!0,n=!1,a=void 0;try{for(var r,s=e.FavSets[Symbol.iterator]();!(t=(r=s.next()).done);t=!0){var i=r.value;if(!(i.Channels instanceof Array))return!1;var o=!0,c=!1,l=void 0;try{for(var u,d=i.Channels[Symbol.iterator]();!(o=(u=d.next()).done);o=!0){var f=u.value;if(!("Number"in f))return!1;if(!("Name"in f))return!1}}catch(h){c=!0,l=h}finally{try{o||null==d.return||d.return()}finally{if(c)throw l}}if(!("Description"in i))return!1}}catch(h){n=!0,a=h}finally{try{t||null==s.return||s.return()}finally{if(n)throw a}}return"SelectedSet"in e},getDefaultSettings:function(){var e={FavSets:[{Description:"First Set",Channels:[{Number:1,Name:"BERITA SATU HD"},{Number:15,Name:"KOMPAS TV"}]},{Description:"Second Set",Channels:[{Number:373,Name:"DISNEY HD"},{Number:328,Name:"FOX HD"}]}],SelectedSet:0};return e},resetSettings:function(){var e=this.getDefaultSettings(),t=JSON.stringify(e);return localStorage.setItem(i,t),e},readFromLocalStorage:function(){var e=localStorage.getItem(i);return e?(e=JSON.parse(e),this.isSettingsValid(e)||(e=this.resetSettings())):e=this.resetSettings(),e},readFromEvent:function(e){if("settings"!=e.key)return null;var t=JSON.parse(e.newValue);return this.isSettingsValid(t)||(t=this.resetSettings()),t},writeToLocalStorage:function(e){if(!this.isSettingsValid(e))throw"Invalid Settings";var t=JSON.stringify(e);localStorage.setItem(i,t)}},c=o,l={created:function(){window.addEventListener("storage",this.onSettingsUpdated),this.$store.dispatch("initializeSettings")},beforeDestroy:function(){window.removeEventListener("storage",this.onSettingsUpdated)},methods:{onSettingsUpdated:function(e){var t=c.readFromEvent(e);t&&this.$store.commit("updateSettings",t)}}},u=l,d=n("2877"),f=Object(d["a"])(u,r,s,!1,null,null,null),h=f.exports,m=(n("a9e3"),n("8c4f")),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("Not found: "+e._s(e.pathMatch))])},v=[],S={props:["pathMatch"]},b=S,j=Object(d["a"])(b,p,v,!1,null,null,null),g=j.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm"},[n("form",{staticClass:"form-inline"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.showDate,expression:"showDate"}],staticClass:"form-control",attrs:{type:"date",id:"showDate"},domProps:{value:e.showDate},on:{change:function(t){return e.loadChannel()},input:function(t){t.target.composing||(e.showDate=t.target.value)}}}),n("select",{directives:[{name:"model",rawName:"v-model",value:e.channelCode,expression:"channelCode"}],staticClass:"form-control ml-sm-2",attrs:{id:"channelCode"},on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.channelCode=t.target.multiple?n:n[0]},function(t){return e.loadChannel()}]}},[n("option",{attrs:{value:""}},[e._v("Channel")]),e._l(e.channels,(function(t){return n("option",{key:t.Number,domProps:{value:t.Number}},[e._v(e._s(t.Name)+" "+e._s(t.Number))])}))],2)])])]),n("br"),n("router-view")],1)},y=[],D=(n("96cf"),{getChannel:function(){var e,t;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,regeneratorRuntime.awrap(fetch("http://app.endycahyono.com/firstmedia/v4/channel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})}));case 2:return e=n.sent,n.next=5,regeneratorRuntime.awrap(e.json());case 5:return t=n.sent,n.abrupt("return",t);case 7:case"end":return n.stop()}}))},getSchedule:function(e,t,n){var a,r;return regeneratorRuntime.async((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,regeneratorRuntime.awrap(fetch("http://app.endycahyono.com/firstmedia/v4/schedule",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ChannelNumbers:e,DateStart:t,DateEnd:n})}));case 2:return a=s.sent,s.next=5,regeneratorRuntime.awrap(a.json());case 5:return r=s.sent,s.abrupt("return",r);case 7:case"end":return s.stop()}}))}}),_=D,C=n("2ef0"),N=n.n(C),k=n("c1df"),x=n.n(k),O={data:function(){return{fromServer:[],showDate:x()().format("YYYY-MM-DD"),channelCode:""}},computed:{channels:function(){if(!this.fromServer.Channels)return[];var e=N.a.sortBy(this.fromServer.Channels,["Name","Number"]);return e}},created:function(){var e;return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(_.getChannel());case 2:e=t.sent,this.fromServer=e;case 4:case"end":return t.stop()}}),null,this)},methods:{loadChannel:function(){this.channelCode&&this.showDate&&this.$router.push({name:"masterdetailselected",params:{chcode:this.channelCode},query:{showdate:this.showDate}})}}},F=O,E=Object(d["a"])(F,w,y,!1,null,null,null),T=E.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("Please choose a channel.")])},I=[],R={},z=Object(d["a"])(R,$,I,!1,null,null,null),M=z.exports,A=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v(e._s(e.channel.Name)+" ("+e._s(e.channel.Number)+")")]),n("table",{staticClass:"table table-striped"},[n("caption",[e._v(e._s(e._f("moment")(e.showDate,"dddd D MMMM YYYY")))]),n("tbody",e._l(e.shows,(function(t){return n("tr",{key:t.Key,attrs:{tabindex:"0"}},[n("td",[e._v(e._s(t.DateStartStr)+" - "+e._s(t.DateEndStr))]),n("td",[n("p",[n("em",[e._v(e._s(t.Title))])]),n("p",[e._v(e._s(t.Description))])])])})),0)])])},P=[],J=(n("d81d"),{props:["channelCode","showDate"],data:function(){return{fromServer:{}}},computed:{channel:function(){return this.fromServer.Channels&&0!=this.fromServer.Channels.length?this.fromServer.Channels[0]:{Name:"",Number:0}},shows:function(){if(!this.fromServer.Schedules)return[];var e=this.fromServer.Schedules.map((function(e){return{Key:e.DateStart+e.Title,DateStart:e.DateStart,DateStartStr:x.a.utc(e.DateStart).local().format("ddd HH:mm"),DateEnd:e.DateEnd,DateEndStr:x.a.utc(e.DateEnd).local().format("HH:mm"),Title:e.Title,Description:e.Description}}));return e}},filters:{moment:function(e,t){return x()(e).format(t)}},created:function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(this.loadData());case 2:case"end":return e.stop()}}),null,this)},watch:{channelCode:"loadData",showDate:"loadData"},methods:{loadData:function(){var e,t,n;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return e=[Number(this.channelCode)],t=x()(this.showDate).toISOString(),n=x()(t).add(1,"days").toISOString(),a.next=5,regeneratorRuntime.awrap(_.getSchedule(e,t,n));case 5:this.fromServer=a.sent;case 6:case"end":return a.stop()}}),null,this)}}}),H=J,Y=(n("48aa"),Object(d["a"])(H,A,P,!1,null,"1a73a4de",null)),U=Y.exports,L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm"},[n("form",{staticClass:"form-inline"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.ShowDate,expression:"ShowDate"}],staticClass:"form-control",attrs:{type:"date"},domProps:{value:e.ShowDate},on:{change:function(t){return e.loadData()},input:function(t){t.target.composing||(e.ShowDate=t.target.value)}}}),n("select",{directives:[{name:"model",rawName:"v-model",value:e.SelectedSet,expression:"SelectedSet"}],staticClass:"form-control ml-sm-2",on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.SelectedSet=t.target.multiple?n:n[0]},function(t){return e.changeSelected()}]}},e._l(e.FavSets,(function(t){return n("option",{key:e.FavSets.indexOf(t),domProps:{value:e.FavSets.indexOf(t)}},[e._v(e._s(e.FavSets.indexOf(t))+": "+e._s(t.Description))])})),0),n("router-link",{staticClass:"btn btn-link",attrs:{to:{name:"favsetedit",params:{favsetid:e.SelectedSet}}}},[e._v("Edit FavSet")]),n("router-link",{staticClass:"btn btn-link",attrs:{to:{name:"favsetedit",params:{favsetid:-1}}}},[e._v("New FavSet")])],1)])])]),n("br"),n("table",{staticClass:"table table-bordered"},[n("thead",[n("tr",[n("th",[e._v("Time")]),e._l(e.ServerResponse.Channels,(function(t){return n("th",{key:t.Number},[n("router-link",{attrs:{to:{name:"masterdetailselected",params:{chcode:t.Number}}}},[e._v(e._s(t.Name))])],1)}))],2)]),n("tbody",e._l(e.Rows,(function(t){return n("tr",{key:t.ShowTime},[n("td",{attrs:{title:t.ShowTimeDate}},[e._v(e._s(t.ShowTimeStr))]),e._l(t.Cells,(function(t){return n("td",{key:t.Show.ChannelNumber,attrs:{rowspan:t.Span}},[n("span",[e._v(e._s(t.Show.Title))]),n("br"),t.Show.Channel?n("span",[e._v(e._s(t.Show.ChannelNumber)+": "+e._s(t.Show.DateStartStr)+" - "+e._s(t.Show.DateEndStr))]):e._e()])}))],2)})),0)])])},V=[],q=(n("99af"),n("7db0"),n("a630"),n("c975"),n("6062"),n("159b"),{data:function(){return{FavSets:this.$store.state.settings.FavSets,SelectedSet:this.$store.state.settings.SelectedSet,ShowDate:x()().format("YYYY-MM-DD"),ServerResponse:{},Rows:[]}},created:function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(this.loadData());case 2:case"end":return e.stop()}}),null,this)},methods:{loadData:function(){var e,t,n;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return e=this.FavSets[this.SelectedSet].Channels.map((function(e){return e.Number})),t=x()(this.ShowDate).startOf("day").toISOString(),n=x()(t).add(1,"days").toISOString(),a.next=5,regeneratorRuntime.awrap(_.getSchedule(e,t,n));case 5:this.ServerResponse=a.sent,this.Rows=this.generateTable(this.ServerResponse.Schedules,this.ServerResponse.Channels);case 7:case"end":return a.stop()}}),null,this)},changeSelected:function(){var e=this.$store.state.settings;e.SelectedSet=this.SelectedSet,this.$store.dispatch("updateSettings",e),this.loadData()},getAllShowTimes:function(e){var t=e.map((function(e){return e.DateStart})).concat(e.map((function(e){return e.DateEnd}))),n=Array.from(new Set(t)),a=N.a.sortBy(n,(function(e){return e}));return a},generateCells:function(e,t,n,a){var r=[],s=!0,i=!1,o=void 0;try{for(var c,l=function(){var t=c.value,s=n.find((function(n){return n.ChannelNumber==t.Number&&n.DateStart<=e&&n.DateEnd>e}));if(!s){var i={Show:{},Span:1};return r.push(i),"continue"}if(s.DateStart==e){var o=a.indexOf(s.DateEnd)-a.indexOf(s.DateStart),l={Show:s,Span:o};return r.push(l),"continue"}},u=t[Symbol.iterator]();!(s=(c=u.next()).done);s=!0)l()}catch(d){i=!0,o=d}finally{try{s||null==u.return||u.return()}finally{if(i)throw o}}return r},generateTable:function(e,t){var n=this;e.forEach((function(e){e.DateStartDate=x()(e.DateStart).toDate(),e.DateStartStr=x()(e.DateStart).format("HH:mm"),e.DateEndDate=x()(e.DateEnd).toDate(),e.DateEndStr=x()(e.DateEnd).format("HH:mm"),e.Channel=t.find((function(t){return t.Number==e.ChannelNumber}))}));var a=this.getAllShowTimes(e),r=a.map((function(r){var s={ShowTime:r,ShowTimeStr:x()(r).format("HH:mm"),ShowTimeDate:x()(r).toDate(),Cells:n.generateCells(r,t,e,a)};return s}));return r}}}),B=q,K=Object(d["a"])(B,L,V,!1,null,null,null),G=K.exports,X=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[e.IsNew?e._e():n("h2",[e._v("Editing Favorite Set "+e._s(e.favSetID))]),e.IsNew?n("h2",[e._v("New Favorite Set")]):e._e(),n("form",{on:{submit:function(t){return t.preventDefault(),e.Update(t)}}},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"description"}},[e._v("Description")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.FavSet.Description,expression:"FavSet.Description"}],staticClass:"form-control",attrs:{type:"text",id:"description",name:"description",placeholder:"Description"},domProps:{value:e.FavSet.Description},on:{input:function(t){t.target.composing||e.$set(e.FavSet,"Description",t.target.value)}}})]),n("div",[e._v(" Selected: "),n("p",e._l(e.Selected,(function(t,a){return n("span",{key:t.Channel.Number},[0!=a?n("span",[e._v(", "+e._s(""))]):e._e(),n("router-link",{attrs:{to:{name:"masterdetailselected",params:{chcode:t.Channel.Number}}}},[e._v(e._s(t.Channel.Name))])],1)})),0)]),n("div",[n("button",{staticClass:"btn btn-info",attrs:{type:"button"},on:{click:function(t){return e.SelectAll()}}},[e._v("S e l e c t All")]),n("button",{staticClass:"btn btn-info",attrs:{type:"button"},on:{click:function(t){return e.DeselectAll()}}},[e._v("Deselect All")])]),n("br"),e._l(e.Selections,(function(t){return n("div",{key:t.Channel.Number,staticClass:"form-check"},[n("label",{staticClass:"form-check-label"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.Selected,expression:"item.Selected"}],staticClass:"form-check-input",attrs:{type:"checkbox",name:"select-"+t.Channel.Number},domProps:{checked:Array.isArray(t.Selected)?e._i(t.Selected,null)>-1:t.Selected},on:{change:function(n){var a=t.Selected,r=n.target,s=!!r.checked;if(Array.isArray(a)){var i=null,o=e._i(a,i);r.checked?o<0&&e.$set(t,"Selected",a.concat([i])):o>-1&&e.$set(t,"Selected",a.slice(0,o).concat(a.slice(o+1)))}else e.$set(t,"Selected",s)}}}),e._v(" "+e._s(t.Channel.Name)+" "),n("router-link",{attrs:{to:{name:"masterdetailselected",params:{chcode:t.Channel.Number}}}},[e._v(e._s(t.Channel.Number))])],1)])})),n("br"),n("div",[e._v(" Selected: "),n("p",e._l(e.Selected,(function(t,a){return n("span",{key:t.Channel.Number},[0!=a?n("span",[e._v(", "+e._s(""))]):e._e(),n("router-link",{attrs:{to:{name:"masterdetailselected",params:{chcode:t.Channel.Number}}}},[e._v(e._s(t.Channel.Name))])],1)})),0)]),n("div",[n("a",{staticClass:"btn btn-secondary",attrs:{href:"#/"}},[e._v("Cancel")]),n("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:e.Delete}},[e._v("Delete")]),n("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("S a v e")])])],2)])},Q=[],W=(n("4de4"),n("caad"),n("a434"),n("2532"),{props:["favSetID"],data:function(){return{FavSet:{},IsNew:!1,Selections:[]}},created:function(){this.loadData()},watch:{favSetID:"loadData"},computed:{Selected:function(){var e=this.Selections.filter((function(e){return e.Selected}));return e}},methods:{SelectAll:function(){this.Selections.forEach((function(e){e.Selected=!0}))},DeselectAll:function(){this.Selections.forEach((function(e){e.Selected=!1}))},Update:function(){var e=this.Selected.map((function(e){return e.Channel}));if(e.length>20)throw"Maximum number of channels should be 20 or less";this.FavSet.Channels=e;var t=JSON.parse(JSON.stringify(this.$store.state.settings));this.IsNew?(t.FavSets.push(this.FavSet),t.SelectedSet=t.FavSets.indexOf(this.FavSet)):(t.FavSets[this.favSetID]=this.FavSet,t.SelectedSet=this.favSetID),this.$store.dispatch("updateSettings",t),this.$router.go(-1)},Delete:function(){if(this.IsNew)this.$router.go(-1);else{if(this.$store.state.settings.FavSets.length<2)throw"Cannot delete the last favorite set";var e=JSON.parse(JSON.stringify(this.$store.state.settings));e.FavSets.splice(this.favSetID,1),e.SelectedSet>e.FavSets.length&&(e.SelectedSet=0),this.$store.dispatch("updateSettings",e),this.$router.go(-1)}},loadData:function(){var e=this.$store.state.settings.FavSets[this.favSetID];this.IsNew=!e,this.IsNew?this.FavSet={Description:"",Channels:[]}:this.FavSet=JSON.parse(JSON.stringify(e));var t=this;_.getChannel().then((function(e){t.Selections=e.Channels.map((function(e){var n=t.FavSet.Channels.map((function(e){return e.Number})).includes(e.Number);return{Channel:e,Selected:n}}))}))}}}),Z=W,ee=Object(d["a"])(Z,X,Q,!1,null,null,null),te=ee.exports;a["default"].use(m["a"]);var ne=[{path:"/",redirect:{name:"masterdetailempty"}},{path:"/masterdetail",component:T,children:[{path:"",name:"masterdetailempty",component:M,meta:{title:function(){return"MasterDetail"}}},{path:":chcode",name:"masterdetailselected",component:U,props:function(e){return{channelCode:e.params.chcode,showDate:e.query.showdate}},meta:{title:function(e){return"MasterDetail "+e.params.chcode}}}]},{path:"/newspaper",name:"newspaper",component:G,meta:{title:function(){return"Newspaper"}}},{path:"/favset/:favsetid/edit",name:"favsetedit",component:te,props:function(e){return{favSetID:Number(e.params.favsetid)}},meta:{title:function(){return"Edit Favorite Set"}}},{path:"*",component:g,props:function(e){return{pathMatch:e.params.pathMatch}},meta:{title:function(){return"404 Not Found"}}}],ae=new m["a"]({routes:ne});ae.afterEach((function(e){a["default"].nextTick((function(){document.title=e.meta.title(e)}))}));var re=ae,se=n("2f62");a["default"].use(se["a"]);var ie=new se["a"].Store({state:{settings:{}},mutations:{updateSettings:function(e,t){e.settings=t}},actions:{initializeSettings:function(e){var t=c.readFromLocalStorage();e.commit("updateSettings",t)},updateSettings:function(e,t){c.writeToLocalStorage(t),e.commit("updateSettings",t)}}}),oe=n("5f5b");n("f9e3"),n("2dd8");a["default"].config.productionTip=!1,a["default"].use(oe["a"]),new a["default"]({router:re,store:ie,render:function(e){return e(h)}}).$mount("#app")},f837:function(e,t,n){}});
//# sourceMappingURL=app.742abbd8.js.map