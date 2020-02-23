webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/FMAPI/fm-api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FmApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FmApiService = (function () {
    function FmApiService(http) {
        this.http = http;
        this.rootUrl = 'http://app.endycahyono.com/first';
    }
    // private rootUrl = 'https://xj5ldtkzwsgekvhk.azurewebsites.net';
    // private rootUrl = 'https://uspcahharhjy5eb4.apphb.com';
    // private rootUrl = 'http://localhost:55429';
    FmApiService.prototype.getChannels = function () {
        var url = this.rootUrl + '/firstmedia/v4/channel';
        var cmd = this.http.post(url, {}, { observe: "response" }).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["a" /* map */])(function (response) {
            var r = response.body.Channels.map(function (channel) {
                var c = {
                    Code: channel.Number,
                    Name: channel.Name,
                    LogoURL: channel.LogoUrl
                };
                return c;
            });
            return r;
        }));
        return cmd;
    };
    FmApiService.prototype.getShow = function (params) {
        var url = this.rootUrl + '/firstmedia/v4/schedule';
        var cmd = this.http.post(url, params, { observe: "response" }).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["a" /* map */])(function (response) {
            var r = {
                Channels: response.body.Channels.map(function (channel) {
                    var c = {
                        Code: channel.Number,
                        Name: channel.Name,
                        LogoURL: channel.LogoUrl
                    };
                    return c;
                }),
                Schedules: response.body.Schedules.map(function (schedule) {
                    var s = {
                        ChannelCode: schedule.ChannelNumber,
                        ShowTime: schedule.DateStart,
                        Title: schedule.Title,
                        Description: schedule.Description,
                        Until: schedule.DateEnd,
                        Length: 0,
                        Channel: null
                    };
                    return s;
                })
            };
            return r;
        }));
        return cmd;
    };
    FmApiService.prototype.deleteCache = function (params) {
        var url = this.rootUrl + '/firstmedia/schedule/cache';
        var cmd = this.http.delete(url, { params: params, observe: "response" });
        return cmd;
    };
    FmApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], FmApiService);
    return FmApiService;
}());



/***/ }),

/***/ "../../../../../src/app/FMAPI/get-show-request.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetShowRequest; });
var GetShowRequest = (function () {
    function GetShowRequest() {
    }
    return GetShowRequest;
}());



/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SetBusyIndicator */
/* unused harmony export SetOtherwise */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uirouter_angular__ = __webpack_require__("../../../../@uirouter/angular/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__busy_indicator_busy_indicator_service__ = __webpack_require__("../../../../../src/app/busy-indicator/busy-indicator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notification_notification_service__ = __webpack_require__("../../../../../src/app/notification/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notification_notification_type_enum__ = __webpack_require__("../../../../../src/app/notification/notification-type.enum.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__FMAPI_fm_api_service__ = __webpack_require__("../../../../../src/app/FMAPI/fm-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__FMAPI_get_show_request__ = __webpack_require__("../../../../../src/app/FMAPI/get-show-request.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_preference_user_preference_service__ = __webpack_require__("../../../../../src/app/user-preference/user-preference.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__show_show_component__ = __webpack_require__("../../../../../src/app/show/show.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__show_master_show_master_component__ = __webpack_require__("../../../../../src/app/show-master/show-master.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__show_master_detail_show_master_detail_component__ = __webpack_require__("../../../../../src/app/show-master-detail/show-master-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__show_newspaper_show_newspaper_component__ = __webpack_require__("../../../../../src/app/show-newspaper/show-newspaper.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__favorite_edit_favorite_edit_component__ = __webpack_require__("../../../../../src/app/favorite-edit/favorite-edit.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _this = this;














var rootModule = {
    states: [
        {
            name: "show",
            url: "/show",
            component: __WEBPACK_IMPORTED_MODULE_9__show_show_component__["a" /* ShowComponent */]
        },
        {
            name: "show.master",
            url: "/masterdetail",
            component: __WEBPACK_IMPORTED_MODULE_10__show_master_show_master_component__["a" /* ShowMasterComponent */],
            resolve: [
                {
                    token: "ResolveChannels",
                    deps: [__WEBPACK_IMPORTED_MODULE_6__FMAPI_fm_api_service__["a" /* FmApiService */], __WEBPACK_IMPORTED_MODULE_4__notification_notification_service__["a" /* NotificationService */]],
                    resolveFn: function (api, notify) { return api
                        .getChannels()
                        .toPromise()
                        .catch(function (error) {
                        var desc = JSON.stringify(error);
                        notify.Notify("Failed to get channel list.", __WEBPACK_IMPORTED_MODULE_5__notification_notification_type_enum__["a" /* NotificationType */].Danger);
                        throw error;
                    }); }
                }
            ]
        },
        {
            name: "show.masterdetail",
            url: "/masterdetail/:chcode?showdate",
            component: __WEBPACK_IMPORTED_MODULE_11__show_master_detail_show_master_detail_component__["a" /* ShowMasterDetailComponent */],
            resolve: [
                {
                    token: "GetShowResponse",
                    deps: [__WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["Transition"], __WEBPACK_IMPORTED_MODULE_6__FMAPI_fm_api_service__["a" /* FmApiService */], __WEBPACK_IMPORTED_MODULE_4__notification_notification_service__["a" /* NotificationService */]],
                    resolveFn: function (transition, api, notify) {
                        var request = new __WEBPACK_IMPORTED_MODULE_7__FMAPI_get_show_request__["a" /* GetShowRequest */]();
                        request.ChannelNumbers = [Number(transition.params().chcode)];
                        var dateStr = transition.params().showdate;
                        if (!dateStr) {
                            var startDate = __WEBPACK_IMPORTED_MODULE_2_moment__().startOf('day').toISOString();
                            request.DateStart = startDate;
                        }
                        else {
                            var startDate = __WEBPACK_IMPORTED_MODULE_2_moment__(_this.showDate).toISOString();
                            request.DateStart = startDate;
                        }
                        var endDate = __WEBPACK_IMPORTED_MODULE_2_moment__(request.DateStart).add(1, "days").toISOString();
                        request.DateEnd = endDate;
                        return api
                            .getShow(request)
                            .toPromise()
                            .catch(function (error) {
                            var desc = JSON.stringify(error);
                            notify.Notify("Failed to get show list.", __WEBPACK_IMPORTED_MODULE_5__notification_notification_type_enum__["a" /* NotificationType */].Danger);
                            throw error;
                        });
                    }
                }
            ]
        },
        {
            name: "show.newspaper",
            url: "/newspaper",
            redirectTo: function (transition) {
                var userprefsvc = transition.injector().get(__WEBPACK_IMPORTED_MODULE_8__user_preference_user_preference_service__["a" /* UserPreferenceService */]);
                var userpref = userprefsvc.Get();
                var target = transition.router.stateService.target("show.newspaperfavorite", { favoriteid: userpref.SelectedFavorite });
                return target;
            }
        },
        {
            name: "show.newspaperfavorite",
            url: "/newspaper/:favoriteid?showdate",
            component: __WEBPACK_IMPORTED_MODULE_12__show_newspaper_show_newspaper_component__["a" /* ShowNewspaperComponent */],
            resolve: [
                {
                    token: "GetShowResponse",
                    deps: [__WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["Transition"], __WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["StateService"], __WEBPACK_IMPORTED_MODULE_8__user_preference_user_preference_service__["a" /* UserPreferenceService */], __WEBPACK_IMPORTED_MODULE_6__FMAPI_fm_api_service__["a" /* FmApiService */], __WEBPACK_IMPORTED_MODULE_4__notification_notification_service__["a" /* NotificationService */]],
                    resolveFn: function (transition, state, userPrefSvc, api, notification) {
                        var favoriteid = Number(transition.params().favoriteid);
                        var userpref = userPrefSvc.Get();
                        if (!userpref.Favorites[favoriteid]) {
                            state.go(state.current, { favoriteid: 0 }, { inherit: true });
                            return;
                        }
                        var favorite = userpref.Favorites[favoriteid];
                        var request = new __WEBPACK_IMPORTED_MODULE_7__FMAPI_get_show_request__["a" /* GetShowRequest */]();
                        request.ChannelNumbers = favorite.Channels.map(function (ch) { return Number(ch.Code); });
                        var dateStr = transition.params().showdate;
                        if (!dateStr) {
                            var startDate = __WEBPACK_IMPORTED_MODULE_2_moment__().startOf('day').toISOString();
                            request.DateStart = startDate;
                        }
                        else {
                            var startDate = __WEBPACK_IMPORTED_MODULE_2_moment__(_this.showDate).toISOString();
                            request.DateStart = startDate;
                        }
                        var endDate = __WEBPACK_IMPORTED_MODULE_2_moment__(request.DateStart).add(1, "days").toISOString();
                        request.DateEnd = endDate;
                        return api
                            .getShow(request)
                            .toPromise()
                            .catch(function (error) {
                            var desc = JSON.stringify(error);
                            notification.Notify("Failed to get show list.", __WEBPACK_IMPORTED_MODULE_5__notification_notification_type_enum__["a" /* NotificationType */].Danger);
                            state.go("show.master");
                            throw error;
                        });
                    }
                }
            ]
        },
        {
            name: "favoriteEdit",
            url: "/favorite/:favoriteid/edit",
            component: __WEBPACK_IMPORTED_MODULE_13__favorite_edit_favorite_edit_component__["a" /* FavoriteEditComponent */],
            resolve: [
                {
                    token: "Channels",
                    deps: [__WEBPACK_IMPORTED_MODULE_6__FMAPI_fm_api_service__["a" /* FmApiService */], __WEBPACK_IMPORTED_MODULE_4__notification_notification_service__["a" /* NotificationService */]],
                    resolveFn: function (api, notify) { return api
                        .getChannels()
                        .toPromise()
                        .catch(function (error) {
                        var desc = JSON.stringify(error);
                        notify.Notify("Failed to get channel list.", __WEBPACK_IMPORTED_MODULE_5__notification_notification_type_enum__["a" /* NotificationType */].Danger);
                        throw error;
                    }); }
                }
            ]
        }
    ],
    config: function (uiRouter, injector, statesModule) {
        var trans = uiRouter.transitionService;
        var busy = injector.get(__WEBPACK_IMPORTED_MODULE_3__busy_indicator_busy_indicator_service__["a" /* BusyIndicatorService */]);
        SetBusyIndicator(trans, busy);
        var userPrefSvc = injector.get(__WEBPACK_IMPORTED_MODULE_8__user_preference_user_preference_service__["a" /* UserPreferenceService */]);
        SetOtherwise(uiRouter, userPrefSvc);
        // uiRouter.stateService.defaultErrorHandler(error => error);
    },
    useHash: true
};
function SetBusyIndicator(transition, busy) {
    transition.onStart({}, function (transition) { busy.Start(); });
    transition.onSuccess({}, function (t) { return busy.Finish(); });
    transition.onError({}, function (t) { return busy.Finish(); });
}
function SetOtherwise(uiRouter, userPrefSvc) {
    var handler = function (matchValue, url, router) {
        var userPref = userPrefSvc.Get();
        var targetString = "show.";
        if (userPref.SelectedView == "master" || userPref.SelectedView == "newspaper") {
            targetString += userPref.SelectedView;
        }
        else {
            targetString += "master";
        }
        var targetState = router.stateRegistry.matcher.find(targetString);
        if (!!targetState) {
            router.stateService.go(targetString, null, { reload: true });
        }
        else {
            return "/show/masterdetail";
        }
    };
    uiRouter.urlService.rules.otherwise(handler);
}
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["UIRouterModule"].forRoot(rootModule)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["UIRouterModule"]],
            providers: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\" role=\"navigation\">\n    <a class=\"navbar-brand\" href=\"/\">NNDDCC</a>\n</nav>\n\n<app-notification></app-notification>\n\n<app-busy-indicator></app-busy-indicator>\n\n<h1 class=\"container\">FirstMedia Show Schedule / Jadwal Acara FirstMedia</h1>\n\n<br />\n\n<ui-view></ui-view>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__show_show_component__ = __webpack_require__("../../../../../src/app/show/show.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__show_master_show_master_component__ = __webpack_require__("../../../../../src/app/show-master/show-master.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__show_master_detail_show_master_detail_component__ = __webpack_require__("../../../../../src/app/show-master-detail/show-master-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__show_newspaper_show_newspaper_component__ = __webpack_require__("../../../../../src/app/show-newspaper/show-newspaper.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__FMAPI_fm_api_service__ = __webpack_require__("../../../../../src/app/FMAPI/fm-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__busy_indicator_busy_indicator_component__ = __webpack_require__("../../../../../src/app/busy-indicator/busy-indicator.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__busy_indicator_busy_indicator_service__ = __webpack_require__("../../../../../src/app/busy-indicator/busy-indicator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__notification_notification_component__ = __webpack_require__("../../../../../src/app/notification/notification.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__notification_notification_service__ = __webpack_require__("../../../../../src/app/notification/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__local_storage_service__ = __webpack_require__("../../../../../src/app/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__user_preference_user_preference_service__ = __webpack_require__("../../../../../src/app/user-preference/user-preference.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__favorite_edit_favorite_edit_component__ = __webpack_require__("../../../../../src/app/favorite-edit/favorite-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__directives_ui_sref_not_active_directive__ = __webpack_require__("../../../../../src/app/directives/ui-sref-not-active.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_4__show_show_component__["a" /* ShowComponent */],
                __WEBPACK_IMPORTED_MODULE_5__show_master_show_master_component__["a" /* ShowMasterComponent */],
                __WEBPACK_IMPORTED_MODULE_6__show_master_detail_show_master_detail_component__["a" /* ShowMasterDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_7__show_newspaper_show_newspaper_component__["a" /* ShowNewspaperComponent */],
                __WEBPACK_IMPORTED_MODULE_10__busy_indicator_busy_indicator_component__["a" /* BusyIndicatorComponent */],
                __WEBPACK_IMPORTED_MODULE_13__notification_notification_component__["a" /* NotificationComponent */],
                __WEBPACK_IMPORTED_MODULE_17__favorite_edit_favorite_edit_component__["a" /* FavoriteEditComponent */],
                __WEBPACK_IMPORTED_MODULE_18__directives_ui_sref_not_active_directive__["a" /* UiSrefNotActiveDirective */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__app_routing_module__["a" /* AppRoutingModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__FMAPI_fm_api_service__["a" /* FmApiService */],
                __WEBPACK_IMPORTED_MODULE_12__busy_indicator_busy_indicator_service__["a" /* BusyIndicatorService */],
                __WEBPACK_IMPORTED_MODULE_14__notification_notification_service__["a" /* NotificationService */],
                __WEBPACK_IMPORTED_MODULE_15__local_storage_service__["a" /* LocalStorageService */],
                __WEBPACK_IMPORTED_MODULE_16__user_preference_user_preference_service__["a" /* UserPreferenceService */]
            ],
            bootstrap: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/busy-indicator/busy-indicator.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/busy-indicator/busy-indicator.component.html":
/***/ (function(module, exports) {

module.exports = "<nav *ngIf=\"service.Counter > 0\" class=\"navbar fixed-bottom navbar-expand-lg navbar-light bg-secondary text-white\" role=\"navigation\">\n  <div class=\"container\">\n    <a class=\"navbar-brand\">\n      Please wait... {{service.Elapsed}}\n    </a>\n  </div>\n</nav>"

/***/ }),

/***/ "../../../../../src/app/busy-indicator/busy-indicator.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusyIndicatorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__busy_indicator_service__ = __webpack_require__("../../../../../src/app/busy-indicator/busy-indicator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BusyIndicatorComponent = (function () {
    function BusyIndicatorComponent(service) {
        this.service = service;
    }
    BusyIndicatorComponent.prototype.ngOnInit = function () {
    };
    BusyIndicatorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-busy-indicator',
            template: __webpack_require__("../../../../../src/app/busy-indicator/busy-indicator.component.html"),
            styles: [__webpack_require__("../../../../../src/app/busy-indicator/busy-indicator.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__busy_indicator_service__["a" /* BusyIndicatorService */]])
    ], BusyIndicatorComponent);
    return BusyIndicatorComponent;
}());



/***/ }),

/***/ "../../../../../src/app/busy-indicator/busy-indicator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusyIndicatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BusyIndicatorService = (function () {
    function BusyIndicatorService() {
        this._Counter = 0;
    }
    Object.defineProperty(BusyIndicatorService.prototype, "Counter", {
        get: function () {
            return this._Counter;
        },
        enumerable: true,
        configurable: true
    });
    BusyIndicatorService.prototype.Start = function () {
        if (this._Counter == 1) {
            return;
        }
        this._Counter = 1;
        this.Elapsed = 0;
        this.StartTimer();
    };
    BusyIndicatorService.prototype.Finish = function () {
        this._Counter = 0;
    };
    BusyIndicatorService.prototype.StartTimer = function () {
        var _this = this;
        setTimeout(function () {
            _this.Elapsed += 1;
            if (_this._Counter > 0) {
                _this.StartTimer();
            }
        }, 1000);
    };
    BusyIndicatorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], BusyIndicatorService);
    return BusyIndicatorService;
}());



/***/ }),

/***/ "../../../../../src/app/directives/ui-sref-not-active.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UiSrefNotActiveDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uirouter_angular__ = __webpack_require__("../../../../@uirouter/angular/lib/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var UiSrefNotActiveDirective = (function () {
    function UiSrefNotActiveDirective(uiSrefStatus, renderer, el) {
        var _this = this;
        this._classes = [];
        this._subscription = uiSrefStatus.uiSrefStatus.subscribe(function (next) {
            _this._classes.forEach(function (cls) { return renderer.setElementClass(el.nativeElement, cls, !next.active); });
        });
    }
    Object.defineProperty(UiSrefNotActiveDirective.prototype, "active", {
        set: function (val) { this._classes = val.split("\s+"); },
        enumerable: true,
        configurable: true
    });
    ;
    UiSrefNotActiveDirective.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('appUiSrefNotActive'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], UiSrefNotActiveDirective.prototype, "active", null);
    UiSrefNotActiveDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[appUiSrefNotActive]'
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Host */])()),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["UISrefStatus"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], UiSrefNotActiveDirective);
    return UiSrefNotActiveDirective;
}());



/***/ }),

/***/ "../../../../../src/app/favorite-edit/favorite-edit.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".channel-logo {\r\n    width: 100px;\r\n    height: 40px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/favorite-edit/favorite-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n  <h2>Editing Favorite</h2>\n\n  <form (submit)=\"Update()\">\n\n    <div class=\"form-group\">\n      <label for=\"code\">Name</label>\n      <input [(ngModel)]=\"Fave.Code\" type=\"text\" class=\"form-control\" id=\"code\" name=\"code\" placeholder=\"Code\">\n    </div>\n\n    <div>\n      <button (click)=\"SelectAll()\" type=\"button\" class=\"btn btn-info\">\n        S e l e c t All\n      </button>\n\n      <button (click)=\"DeselectAll()\" type=\"button\" class=\"btn btn-info\">\n        Deselect All\n      </button>\n    </div>\n\n    <br />\n\n    <div *ngFor=\"let item of Selections\" class=\"form-check\">\n      <label class=\"form-check-label\">\n        <input [(ngModel)]=\"item.Selected\" type=\"checkbox\" name=\"select-{{item.Channel.Code}}\" class=\"form-check-input\">\n        {{item.Channel.Name}} ({{item.Channel.Code}})\n      </label>\n    </div>\n\n    <br /> Selected:\n    <p>\n      <a *ngFor=\"let item of GetSelected()\" uiSref=\"show.masterdetail\" [uiParams]=\"{chcode:item.Code}\">\n        {{item.Name}}\n      </a>\n    </p>\n\n    <div>\n      <a href=\"#/\" class=\"btn btn-secondary\">\n        Cancel\n      </a>\n\n      <button (click)=\"Delete()\" type=\"button\" class=\"btn btn-danger\">\n        Delete\n      </button>\n\n      <button type=\"submit\" class=\"btn btn-primary\">\n        S a v e\n      </button>\n    </div>\n\n  </form>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/favorite-edit/favorite-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoriteEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uirouter_angular__ = __webpack_require__("../../../../@uirouter/angular/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_preference_user_preference_service__ = __webpack_require__("../../../../../src/app/user-preference/user-preference.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_preference_user_preference__ = __webpack_require__("../../../../../src/app/user-preference/user-preference.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notification_notification_service__ = __webpack_require__("../../../../../src/app/notification/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notification_notification_type_enum__ = __webpack_require__("../../../../../src/app/notification/notification-type.enum.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FavoriteEditComponent = (function () {
    function FavoriteEditComponent(userprefsvc, transition, state, notification) {
        this.userprefsvc = userprefsvc;
        this.transition = transition;
        this.state = state;
        this.notification = notification;
    }
    FavoriteEditComponent.prototype.ngOnInit = function () {
        this.UserPref = this.userprefsvc.Get();
        var idx = Number(this.transition.params().favoriteid);
        var existing = this.UserPref.Favorites[idx];
        this.IsNew = existing == undefined || existing == null;
        if (this.IsNew) {
            this.Fave = new __WEBPACK_IMPORTED_MODULE_4__user_preference_user_preference__["a" /* UserPreference */].Favorite();
            this.Fave.Channels = [];
        }
        else {
            this.Fave = existing;
        }
        var self = this;
        this.Selections = this.Channels.map(function (channel) {
            var selected = self.Fave.Channels.map(function (ch) { return ch.Code; }).includes(channel.Code.toString());
            return { Channel: channel, Selected: selected };
        });
    };
    FavoriteEditComponent.prototype.GetSelected = function () {
        var selecteds = this.Selections.filter(function (s) { return s.Selected; }).map(function (s) { return s.Channel; });
        return selecteds;
    };
    FavoriteEditComponent.prototype.SelectAll = function () {
        this.Selections.forEach(function (item) { return item.Selected = true; });
    };
    FavoriteEditComponent.prototype.DeselectAll = function () {
        this.Selections.forEach(function (item) { return item.Selected = false; });
    };
    FavoriteEditComponent.prototype.Delete = function () {
        if (this.IsNew) {
            this.state.go("show." + this.UserPref.SelectedView);
            return;
        }
        ;
        if (this.UserPref.Favorites.length < 2) {
            this.notification.Notify("Cannot delete the last item.", __WEBPACK_IMPORTED_MODULE_6__notification_notification_type_enum__["a" /* NotificationType */].Warning);
            return;
        }
        ;
        var idx = this.UserPref.Favorites.indexOf(this.Fave);
        this.UserPref.Favorites.splice(idx, 1);
        if (this.UserPref.SelectedFavorite > this.UserPref.Favorites.length) {
            this.UserPref.SelectedFavorite = 0;
        }
        ;
        this.userprefsvc.Set(this.UserPref);
        this.state.go("show." + this.UserPref.SelectedView);
    };
    FavoriteEditComponent.prototype.Update = function () {
        if (!this.Fave.Code) {
            this.Fave.Code = __WEBPACK_IMPORTED_MODULE_2_moment__().format("x");
        }
        ;
        this.Fave.Channels = this.GetSelected();
        if (this.IsNew) {
            this.UserPref.Favorites.push(this.Fave);
        }
        ;
        this.UserPref.SelectedFavorite = this.UserPref.Favorites.indexOf(this.Fave);
        this.userprefsvc.Set(this.UserPref);
        this.state.go("show." + this.UserPref.SelectedView);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], FavoriteEditComponent.prototype, "Channels", void 0);
    FavoriteEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-favorite-edit',
            template: __webpack_require__("../../../../../src/app/favorite-edit/favorite-edit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/favorite-edit/favorite-edit.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__user_preference_user_preference_service__["a" /* UserPreferenceService */],
            __WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["Transition"],
            __WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["StateService"],
            __WEBPACK_IMPORTED_MODULE_5__notification_notification_service__["a" /* NotificationService */]])
    ], FavoriteEditComponent);
    return FavoriteEditComponent;
}());



/***/ }),

/***/ "../../../../../src/app/local-storage.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.Get = function (keyword) {
        var content = JSON.parse(localStorage.getItem(keyword));
        return content;
    };
    LocalStorageService.prototype.Set = function (keyword, value) {
        var content = JSON.stringify(value);
        localStorage.setItem(keyword, content);
    };
    LocalStorageService.prototype.Remove = function (keyword) {
        localStorage.removeItem(keyword);
    };
    LocalStorageService.prototype.Clear = function () {
        localStorage.clear();
    };
    LocalStorageService.prototype.Keys = function () {
        var content = [];
        for (var idx = 0; idx < localStorage.length; idx++) {
            var keyword = localStorage.key(idx);
            content.push(keyword);
        }
        return content;
    };
    LocalStorageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], LocalStorageService);
    return LocalStorageService;
}());



/***/ }),

/***/ "../../../../../src/app/notification/notification-type.enum.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationType; });
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["Light"] = 0] = "Light";
    NotificationType[NotificationType["Dark"] = 1] = "Dark";
    NotificationType[NotificationType["Primary"] = 2] = "Primary";
    NotificationType[NotificationType["Secondary"] = 3] = "Secondary";
    NotificationType[NotificationType["Success"] = 4] = "Success";
    NotificationType[NotificationType["Danger"] = 5] = "Danger";
    NotificationType[NotificationType["Warning"] = 6] = "Warning";
    NotificationType[NotificationType["Info"] = 7] = "Info";
})(NotificationType || (NotificationType = {}));


/***/ }),

/***/ "../../../../../src/app/notification/notification.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".bottomright {\r\n    position: fixed;\r\n    width: 33%;\r\n    bottom: 35px;\r\n    right: 10px;\r\n    z-index: 99;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/notification/notification.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"bottomright\">\n  <div *ngFor=\"let notification of service.Notifications\" class=\"alert {{GetType(notification)}} alert-dismissible\" [style.opacity]=\"notification.Opacity\"\n    role=\"alert\">\n    {{notification.Message}}\n    <button (click)=\"Close(notification)\" type=\"button\" class=\"close\" aria-label=\"Close\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/notification/notification.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification_service__ = __webpack_require__("../../../../../src/app/notification/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification_type_enum__ = __webpack_require__("../../../../../src/app/notification/notification-type.enum.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationComponent = (function () {
    function NotificationComponent(service) {
        this.service = service;
    }
    NotificationComponent.prototype.ngOnInit = function () {
    };
    NotificationComponent.prototype.Close = function (notif) {
        this.service.Close(notif);
    };
    NotificationComponent.prototype.GetType = function (notif) {
        switch (notif.Type) {
            case __WEBPACK_IMPORTED_MODULE_2__notification_type_enum__["a" /* NotificationType */].Dark:
                return "alert-dark";
            case __WEBPACK_IMPORTED_MODULE_2__notification_type_enum__["a" /* NotificationType */].Primary:
                return "alert-primary";
            case __WEBPACK_IMPORTED_MODULE_2__notification_type_enum__["a" /* NotificationType */].Secondary:
                return "alert-secondary";
            case __WEBPACK_IMPORTED_MODULE_2__notification_type_enum__["a" /* NotificationType */].Success:
                return "alert-success";
            case __WEBPACK_IMPORTED_MODULE_2__notification_type_enum__["a" /* NotificationType */].Danger:
                return "alert-danger";
            case __WEBPACK_IMPORTED_MODULE_2__notification_type_enum__["a" /* NotificationType */].Warning:
                return "alert-warning";
            case __WEBPACK_IMPORTED_MODULE_2__notification_type_enum__["a" /* NotificationType */].Info:
                return "alert-info";
            default:
                return "alert-light";
        }
    };
    NotificationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-notification',
            template: __webpack_require__("../../../../../src/app/notification/notification.component.html"),
            styles: [__webpack_require__("../../../../../src/app/notification/notification.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__notification_service__["a" /* NotificationService */]])
    ], NotificationComponent);
    return NotificationComponent;
}());



/***/ }),

/***/ "../../../../../src/app/notification/notification.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification__ = __webpack_require__("../../../../../src/app/notification/notification.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationService = (function () {
    function NotificationService() {
        this.Notifications = [];
        this.IntervalMS = 3000;
    }
    NotificationService.prototype.Notify = function (msg, type) {
        var _this = this;
        var notif = new __WEBPACK_IMPORTED_MODULE_1__notification__["a" /* Notification */]();
        notif.Message = msg;
        notif.Type = type;
        notif.Opacity = 0.9;
        this.Notifications.push(notif);
        setTimeout(function () { return _this.FadeNotification(notif); }, this.IntervalMS);
    };
    NotificationService.prototype.Close = function (notif) {
        var idx = this.Notifications.indexOf(notif);
        if (idx > -1) {
            this.Notifications.splice(idx, 1);
        }
    };
    NotificationService.prototype.FadeNotification = function (notif) {
        var _this = this;
        notif.Opacity -= 0.1;
        if (notif.Opacity > 0.1) {
            setTimeout(function () { return _this.FadeNotification(notif); }, this.IntervalMS);
        }
        else {
            this.Close(notif);
        }
    };
    NotificationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], NotificationService);
    return NotificationService;
}());



/***/ }),

/***/ "../../../../../src/app/notification/notification.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notification; });
var Notification = (function () {
    function Notification() {
    }
    return Notification;
}());



/***/ }),

/***/ "../../../../../src/app/show-master-detail/show-master-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/show-master-detail/show-master-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n  <p>\n    <a uiSref=\"show.master\">Back to channel list</a>\n  </p>\n\n  <h3>\n    {{GetShowResponse.Channels[0].Name}} ({{GetShowResponse.Channels[0].Code}})\n  </h3>\n\n  <br/>\n\n  <div class=\"form-inline\">\n    <div class=\"form-check\">\n      <label class=\"form-check-label\">\n        <input [(ngModel)]=\"FilterPast\" (change)=\"FilterPastChange()\" type=\"checkbox\" class=\"form-check-input\" /> Filter Past Shows\n      </label>\n    </div>\n    <input [(ngModel)]=\"ShowDate\" (change)=\"RefreshDetail()\" type=\"date\" class=\"form-control ml-sm-3\" title=\"Show Date\" />\n  </div>\n\n  <br/>\n\n  <p>\n    {{ShowDate | date:\"EEE d MMM yyyy\"}}\n  </p>\n\n  <table class=\"table table-striped\">\n    <caption>\n      {{ShowDate | date:\"EEE d MMM yyyy\"}}\n    </caption>\n    <tbody>\n      <ng-container *ngFor=\"let show of GetShowResponse.Schedules\">\n        <tr *ngIf=\"ShouldBeVisible(show)\" tabindex=\"0\">\n          <td>{{show.ShowTime | date:\"EEE HH:mm\"}} - {{show.Until | date:\"HH:mm\"}}</td>\n          <td>\n            <p>\n              <em>{{show.Title}}</em>\n            </p>\n            <p>{{show.Description}}</p>\n          </td>\n        </tr>\n      </ng-container>\n    </tbody>\n  </table>\n\n  <p>\n    <a uiSref=\"show.master\">Back to channel list</a>\n  </p>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/show-master-detail/show-master-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowMasterDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uirouter_angular__ = __webpack_require__("../../../../@uirouter/angular/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_preference_user_preference_service__ = __webpack_require__("../../../../../src/app/user-preference/user-preference.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ShowMasterDetailComponent = (function () {
    function ShowMasterDetailComponent(transition, state, userPrefSvc) {
        this.transition = transition;
        this.state = state;
        this.userPrefSvc = userPrefSvc;
    }
    ShowMasterDetailComponent.prototype.ngOnInit = function () {
        this.GetShowResponse.Schedules.forEach(function (show) {
            show.ShowTime = __WEBPACK_IMPORTED_MODULE_2_moment__(show.ShowTime).toDate();
            show.Until = __WEBPACK_IMPORTED_MODULE_2_moment__(show.Until).toDate();
        });
        this.ShowDate = !!this.transition.params().showdate
            ? this.transition.params().showdate
            : __WEBPACK_IMPORTED_MODULE_2_moment__({ hour: 0 }).format('YYYY-MM-DD');
        this.FilterPast = !!this.userPrefSvc.Get().FilterPast;
    };
    ShowMasterDetailComponent.prototype.ShouldBeVisible = function (show) {
        var now = __WEBPACK_IMPORTED_MODULE_2_moment__().toDate();
        var isVisible = this.FilterPast == false
            || this.FilterPast == true && show.Until > now;
        return isVisible;
    };
    ShowMasterDetailComponent.prototype.RefreshDetail = function () {
        var params = {};
        params.chcode = this.GetShowResponse.Channels[0].Code;
        var todayStr = __WEBPACK_IMPORTED_MODULE_2_moment__().format("YYYY-MM-DD");
        if (this.ShowDate != todayStr) {
            params.showdate = this.ShowDate;
            if (this.ShowDate < todayStr) {
                this.FilterPast = false;
            }
        }
        this.state.go("show.masterdetail", params, { inherit: false });
    };
    ShowMasterDetailComponent.prototype.FilterPastChange = function () {
        var pref = this.userPrefSvc.Get();
        pref.FilterPast = !!this.FilterPast;
        this.userPrefSvc.Set(pref);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], ShowMasterDetailComponent.prototype, "GetShowResponse", void 0);
    ShowMasterDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-show-master-detail',
            template: __webpack_require__("../../../../../src/app/show-master-detail/show-master-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/show-master-detail/show-master-detail.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["Transition"],
            __WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["StateService"],
            __WEBPACK_IMPORTED_MODULE_3__user_preference_user_preference_service__["a" /* UserPreferenceService */]])
    ], ShowMasterDetailComponent);
    return ShowMasterDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/show-master/show-master.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/show-master/show-master.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n  <p *ngFor=\"let channel of ResolveChannels\">\n    <a uiSref=\"show.masterdetail\" [uiParams]=\"{chcode: channel.Code}\">\n      {{channel.Name}} {{channel.Code}}\n    </a>\n  </p>\n\n</div>\n\n<ui-view></ui-view>"

/***/ }),

/***/ "../../../../../src/app/show-master/show-master.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowMasterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_preference_user_preference_service__ = __webpack_require__("../../../../../src/app/user-preference/user-preference.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShowMasterComponent = (function () {
    function ShowMasterComponent(UserPrefSvc) {
        this.UserPrefSvc = UserPrefSvc;
    }
    ShowMasterComponent.prototype.ngOnInit = function () {
        var userPref = this.UserPrefSvc.Get();
        userPref.SelectedView = "master";
        this.UserPrefSvc.Set(userPref);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], ShowMasterComponent.prototype, "ResolveChannels", void 0);
    ShowMasterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-show-master',
            template: __webpack_require__("../../../../../src/app/show-master/show-master.component.html"),
            styles: [__webpack_require__("../../../../../src/app/show-master/show-master.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__user_preference_user_preference_service__["a" /* UserPreferenceService */]])
    ], ShowMasterComponent);
    return ShowMasterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/show-newspaper/newspaper-row.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewspaperRow; });
var NewspaperRow = (function () {
    function NewspaperRow() {
    }
    return NewspaperRow;
}());

(function (NewspaperRow) {
    var Cell = (function () {
        function Cell() {
        }
        return Cell;
    }());
    NewspaperRow.Cell = Cell;
})(NewspaperRow || (NewspaperRow = {}));


/***/ }),

/***/ "../../../../../src/app/show-newspaper/show-newspaper.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/show-newspaper/show-newspaper.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n    <div *ngFor=\"let fav of UserPreference.Favorites\" class=\"form-check form-check-inline\">\n        <label class=\"form-check-label\">\n            <input [(ngModel)]=\"UserPreference.SelectedFavorite\" [value]=\"UserPreference.Favorites.indexOf(fav)\" (change)=\"RefreshDetail()\"\n                name=\"favorite\" type=\"radio\" class=\"form-check-input\"> {{fav.Code}}\n            <a uiSref=\"favoriteEdit\" [uiParams]=\"{favoriteid:UserPreference.Favorites.indexOf(fav)}\">Edit</a>\n        </label>\n    </div>\n\n    <div class=\"form-check form-check-inline\">\n        <label class=\"form-check-label\">\n            <a uiSref=\"favoriteEdit\" [uiParams]=\"{favoriteid:-1}\">Create</a>\n        </label>\n    </div>\n\n    <p>\n        <a *ngFor=\"let channel of UserPreference.Favorites[UserPreference.SelectedFavorite].Channels\" uiSref=\"show.masterdetail\"\n            [uiParams]=\"{chcode:channel.Code}\">\n            {{channel.Name}}\n        </a>\n    </p>\n\n    <div class=\"form-inline\">\n        <div class=\"form-check\">\n            <label class=\"form-check-label\">\n                <input [(ngModel)]=\"UserPreference.FilterPast\" (change)=\"ChangeFilterPast()\" type=\"checkbox\" class=\"form-check-input\" /> Filter Past Shows\n            </label>\n        </div>\n        <input [(ngModel)]=\"ShowDate\" (change)=\"RefreshDetail()\" type=\"date\" class=\"form-control ml-sm-3\" title=\"Show Date\" />\n    </div>\n\n</div>\n\n<br />\n\n<table class=\"table table-bordered\">\n    <thead>\n        <tr>\n            <th>Time</th>\n            <th *ngFor=\"let cs of GetShowResponse.Channels\">\n                <a uiSref=\"show.masterdetail\" [uiParams]=\"{chcode:cs.Code}\">\n                    {{cs.Name}}\n                </a>\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n\n        <tr *ngFor=\"let milestone of Milestones\">\n            <td title=\"{{milestone.ShowTime | date:'full'}}\">{{milestone.ShowTime | date:\"HH:mm\"}}</td>\n            <td *ngFor=\"let cell of milestone.Cells\" [rowSpan]=\"cell.Span\" [class.text-muted]=\"!ShouldBeVisible(cell.Show)\">\n                <ng-container *ngIf=\"!!cell.Show\">\n                    <a (click)=\"ShowDetail(cell.Show)\">\n                        {{cell.Show.Title}}\n                    </a>\n                    <br/>\n                    <span>\n                        {{cell.Show.Channel.Name}} ({{cell.Show.Channel.Code}}) {{cell.Show.ShowTime | date:\"HH:mm\"}} - {{cell.Show.Until | date:\"HH:mm\"}}\n                    </span>\n                </ng-container>\n            </td>\n        </tr>\n\n    </tbody>\n</table>"

/***/ }),

/***/ "../../../../../src/app/show-newspaper/show-newspaper.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowNewspaperComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uirouter_angular__ = __webpack_require__("../../../../@uirouter/angular/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_preference_user_preference_service__ = __webpack_require__("../../../../../src/app/user-preference/user-preference.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__newspaper_row__ = __webpack_require__("../../../../../src/app/show-newspaper/newspaper-row.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ShowNewspaperComponent = (function () {
    function ShowNewspaperComponent(Transition, UserPrefSvc, StateSvc) {
        this.Transition = Transition;
        this.UserPrefSvc = UserPrefSvc;
        this.StateSvc = StateSvc;
    }
    ShowNewspaperComponent.prototype.ngOnInit = function () {
        var favID = Number(this.Transition.params().favoriteid);
        // set showdate
        var showDateRaw = this.Transition.params().showdate;
        var todayStr = __WEBPACK_IMPORTED_MODULE_2_moment__({ hour: 0 }).format('YYYY-MM-DD');
        this.ShowDate = !!showDateRaw ? showDateRaw : todayStr;
        // save last used favorite and view
        this.UserPreference = this.UserPrefSvc.Get();
        this.UserPreference.SelectedFavorite = favID;
        this.UserPreference.SelectedView = "newspaper";
        this.UserPrefSvc.Set(this.UserPreference);
        // turn off filter past if viewing past dates
        if (this.ShowDate < todayStr) {
            this.UserPreference.FilterPast = false;
        }
        this.PopulateTable();
    };
    ShowNewspaperComponent.prototype.PopulateTable = function () {
        // generate table data with showtime as row label and channel as column label
        var _this = this;
        var shows = this.GetShowResponse.Schedules
            .filter(function (show) {
            var now = __WEBPACK_IMPORTED_MODULE_2_moment__().toDate();
            if (_this.UserPreference.FilterPast) {
                return __WEBPACK_IMPORTED_MODULE_2_moment__(show.Until).toDate() > now;
            }
            else {
                return true;
            }
        })
            .map(function (show) {
            // show.ShowTime = moment(show.ShowTime).toDate();
            // show.Until = moment(show.Until).toDate();
            show.Channel = _this.GetShowResponse.Channels.find(function (c) { return c.Code == show.ChannelCode; });
            return show;
        });
        this.Milestones = __WEBPACK_IMPORTED_MODULE_3_lodash__(shows.map(function (s) { return s.ShowTime; }))
            .union(shows.map(function (s) { return s.Until; }))
            .sortBy(function (t) { return t; })
            .map(function (t) {
            var row = new __WEBPACK_IMPORTED_MODULE_5__newspaper_row__["a" /* NewspaperRow */]();
            row.ShowTime = t;
            row.Cells = [];
            return row;
        })
            .value();
        this.Milestones.forEach(function (milestone) {
            _this.GetShowResponse.Channels.forEach(function (channel) {
                var currentShow = shows.find(function (show) { return show.ChannelCode == channel.Code
                    && show.ShowTime <= milestone.ShowTime && show.Until > milestone.ShowTime; });
                if (!currentShow) {
                    // if no show, insert blank cell
                    var cell = new __WEBPACK_IMPORTED_MODULE_5__newspaper_row__["a" /* NewspaperRow */].Cell();
                    cell.Span = 1;
                    milestone.Cells.push(cell);
                }
                else if (currentShow.ShowTime == milestone.ShowTime) {
                    // if start time match
                    var cell = new __WEBPACK_IMPORTED_MODULE_5__newspaper_row__["a" /* NewspaperRow */].Cell();
                    cell.Show = currentShow;
                    var timeStart = _this.Milestones.map(function (m) { return m.ShowTime; }).indexOf(currentShow.ShowTime);
                    var timeEnd = _this.Milestones.map(function (m) { return m.ShowTime; }).indexOf(currentShow.Until);
                    cell.Span = timeEnd - timeStart;
                    milestone.Cells.push(cell);
                }
                else {
                    // has show but start time doesn't match: do nothing
                }
            });
        });
    };
    ShowNewspaperComponent.prototype.RefreshDetail = function () {
        var params = {};
        params.favoriteid = this.UserPreference.SelectedFavorite;
        var todayStr = __WEBPACK_IMPORTED_MODULE_2_moment__().format("YYYY-MM-DD");
        if (this.ShowDate != todayStr) {
            params.showdate = this.ShowDate;
        }
        this.StateSvc.go(this.StateSvc.current.name, params, { inherit: false });
    };
    ShowNewspaperComponent.prototype.ShouldBeVisible = function (show) {
        if (!show) {
            return true;
        }
        var now = __WEBPACK_IMPORTED_MODULE_2_moment__().toDate();
        return __WEBPACK_IMPORTED_MODULE_2_moment__(show.Until).toDate() > now;
    };
    ShowNewspaperComponent.prototype.ChangeFilterPast = function () {
        var pref = this.UserPrefSvc.Get();
        pref.FilterPast = this.UserPreference.FilterPast;
        this.UserPrefSvc.Set(pref);
        this.PopulateTable();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], ShowNewspaperComponent.prototype, "GetShowResponse", void 0);
    ShowNewspaperComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-show-newspaper',
            template: __webpack_require__("../../../../../src/app/show-newspaper/show-newspaper.component.html"),
            styles: [__webpack_require__("../../../../../src/app/show-newspaper/show-newspaper.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["Transition"],
            __WEBPACK_IMPORTED_MODULE_4__user_preference_user_preference_service__["a" /* UserPreferenceService */],
            __WEBPACK_IMPORTED_MODULE_1__uirouter_angular__["StateService"]])
    ], ShowNewspaperComponent);
    return ShowNewspaperComponent;
}());



/***/ }),

/***/ "../../../../../src/app/show/show.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/show/show.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <p>\r\n        Layout\r\n        <a uiSref=\"show.master\" uiSrefActive=\"btn-primary\" appUiSrefNotActive=\"btn-secondary\" class=\"btn ml-sm-3\">All Channels</a>\r\n        <a uiSref=\"show.newspaper\" uiSrefActive=\"btn-primary\" appUiSrefNotActive=\"btn-secondary\" class=\"btn\">Newspaper</a>\r\n    </p>\r\n</div>\r\n\r\n<ui-view></ui-view>"

/***/ }),

/***/ "../../../../../src/app/show/show.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShowComponent = (function () {
    function ShowComponent() {
    }
    ShowComponent.prototype.ngOnInit = function () {
    };
    ShowComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-show',
            template: __webpack_require__("../../../../../src/app/show/show.component.html"),
            styles: [__webpack_require__("../../../../../src/app/show/show.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ShowComponent);
    return ShowComponent;
}());



/***/ }),

/***/ "../../../../../src/app/user-preference/user-preference.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPreferenceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_storage_service__ = __webpack_require__("../../../../../src/app/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_preference__ = __webpack_require__("../../../../../src/app/user-preference/user-preference.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserPreferenceService = (function () {
    function UserPreferenceService(localstor) {
        this.localstor = localstor;
        this.StoreKey = "firstmediaSchedule.settings";
    }
    UserPreferenceService.prototype.Get = function () {
        try {
            var content = this.localstor.Get(this.StoreKey);
            if (content == null) {
                this.Reset();
                content = this.localstor.Get(this.StoreKey);
            }
            return content;
        }
        catch (error) {
            this.Reset();
            var content = this.localstor.Get(this.StoreKey);
            return content;
        }
    };
    UserPreferenceService.prototype.Set = function (pref) {
        this.localstor.Set(this.StoreKey, pref);
    };
    UserPreferenceService.prototype.Reset = function () {
        var ch1 = new __WEBPACK_IMPORTED_MODULE_2__user_preference__["a" /* UserPreference */].Channel();
        ch1.Code = "1";
        ch1.Name = "BERITA SATU HD";
        ch1.LogoURL = "http://www.firstmedia.com/files/packages/BeritasatuCh1.png";
        var ch2 = new __WEBPACK_IMPORTED_MODULE_2__user_preference__["a" /* UserPreference */].Channel();
        ch2.Code = "15";
        ch2.Name = "KOMPAS TV";
        ch2.LogoURL = "http://www.firstmedia.com/files/packages/kompas-new.png";
        var fav1 = new __WEBPACK_IMPORTED_MODULE_2__user_preference__["a" /* UserPreference */].Favorite();
        fav1.Code = "favorite1";
        fav1.Channels = [ch1, ch2];
        var ch3 = new __WEBPACK_IMPORTED_MODULE_2__user_preference__["a" /* UserPreference */].Channel();
        ch3.Code = "373";
        ch3.Name = "DISNEY HD";
        ch3.LogoURL = "http://www.firstmedia.com/files/packages/Disney+logo+baru.jpg";
        var ch4 = new __WEBPACK_IMPORTED_MODULE_2__user_preference__["a" /* UserPreference */].Channel();
        ch4.Code = "328";
        ch4.Name = "FOX HD";
        ch4.LogoURL = "http://www.firstmedia.com/files/packages/FOX Channel Logo_Mono Orange.png";
        var fav2 = new __WEBPACK_IMPORTED_MODULE_2__user_preference__["a" /* UserPreference */].Favorite();
        fav2.Code = "favorite2";
        fav2.Channels = [ch3, ch4];
        var content = new __WEBPACK_IMPORTED_MODULE_2__user_preference__["a" /* UserPreference */]();
        content.Favorites = [fav1, fav2];
        content.SelectedFavorite = 0;
        content.FilterPast = true;
        content.SelectedView = "master";
        content.UseAPIVersion = 3;
        this.Set(content);
    };
    UserPreferenceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__local_storage_service__["a" /* LocalStorageService */]])
    ], UserPreferenceService);
    return UserPreferenceService;
}());



/***/ }),

/***/ "../../../../../src/app/user-preference/user-preference.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPreference; });
var UserPreference = (function () {
    function UserPreference() {
    }
    return UserPreference;
}());

(function (UserPreference) {
    var Favorite = (function () {
        function Favorite() {
        }
        return Favorite;
    }());
    UserPreference.Favorite = Favorite;
    var Channel = (function () {
        function Channel() {
        }
        return Channel;
    }());
    UserPreference.Channel = Channel;
})(UserPreference || (UserPreference = {}));


/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map