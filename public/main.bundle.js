webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/admin/admin.module": [
		"../../../../../src/app/admin/admin.module.ts",
		"common",
		"admin.module"
	],
	"app/admin/collections/collections.module": [
		"../../../../../src/app/admin/collections/collections.module.ts",
		"collections.module"
	],
	"app/admin/login/login.module": [
		"../../../../../src/app/admin/login/login.module.ts",
		"common",
		"login.module"
	],
	"app/admin/page/page.module": [
		"../../../../../src/app/admin/page/page.module.ts",
		"common",
		"page.module"
	],
	"app/admin/product/product.module": [
		"../../../../../src/app/admin/product/product.module.ts",
		"product.module",
		"common"
	],
	"app/site/cart/cart.module": [
		"../../../../../src/app/site/cart/cart.module.ts",
		"common",
		"cart.module"
	],
	"app/site/collection/collection.module": [
		"../../../../../src/app/site/collection/collection.module.ts",
		"common",
		"collection.module"
	],
	"app/site/home/home.module": [
		"../../../../../src/app/site/home/home.module.ts",
		"common",
		"home.module"
	],
	"app/site/product/product.module": [
		"../../../../../src/app/site/product/product.module.ts",
		"common",
		"product.module.0"
	],
	"app/site/site.module": [
		"../../../../../src/app/site/site.module.ts",
		"site.module",
		"common"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

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

module.exports = "<router-outlet></router-outlet>\r\n"

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

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_window_service__ = __webpack_require__("../../../../../src/app/shared/services/window.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_services_http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_services_socket_service__ = __webpack_require__("../../../../../src/app/shared/services/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_services_auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_services_progress_service__ = __webpack_require__("../../../../../src/app/shared/services/progress.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_services_placement_service__ = __webpack_require__("../../../../../src/app/shared/services/placement.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_12__app_routing__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_14__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__["a" /* FlexLayoutModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["d" /* MatCardModule */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_7__shared_services_window_service__["b" /* WINDOW_PROVIDERS */], __WEBPACK_IMPORTED_MODULE_8__shared_services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_9__shared_services_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_10__shared_services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_13__shared_services_progress_service__["a" /* ProgressService */], __WEBPACK_IMPORTED_MODULE_15__shared_services_placement_service__["a" /* PlacementService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");

var APP_ROUTES = [
    { path: '', loadChildren: 'app/site/site.module#SiteModule' },
    { path: 'agent', loadChildren: 'app/admin/admin.module#AdminModule' },
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["h" /* RouterModule */].forRoot(APP_ROUTES);


/***/ }),

/***/ "../../../../../src/app/shared/components/abstract-search/abstract-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_progress_service__ = __webpack_require__("../../../../../src/app/shared/services/progress.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import {AuthService} from '../../services/auth.service';





var AbstractSearchComponent = /** @class */ (function () {
    function AbstractSearchComponent(httpService, progressService, router, dialog, snackBar, sanitizer) {
        this.httpService = httpService;
        this.progressService = progressService;
        this.router = router;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.sanitizer = sanitizer;
        this.cards = null;
        this.selectedId = null;
        this.rows = [];
        this.offset = 0;
        this.limit = 8;
        this.totalCards = null;
        this.searchData = null;
        this.initSearchData = null;
    }
    AbstractSearchComponent.prototype.ngOnInit = function () {
        this.initSearchData = this.searchData;
        this.searching();
    };
    AbstractSearchComponent.prototype.searching = function () {
        var _this = this;
        this.progressService.enable();
        this.searchData = this.searchData ? this.searchData : { options: { phrase: '' } };
        var data = Object.assign({
            offset: this.offset ? this.offset : 0,
            limit: this.limit ? this.limit : 8,
        }, this.searchData);
        this.httpService.post("search/" + this.key, data).subscribe(function (res) {
            _this.cards = res.data;
            _this.totalCards = res.total ? parseInt(res.total, 10) : 0;
            _this.alignRow();
            _this.progressService.disable();
        }, function (err) {
            console.log('err', err);
            _this.progressService.disable();
        });
    };
    AbstractSearchComponent.prototype.alignRow = function () {
        if (this.totalCards <= 0) {
            this.rows = [];
            return;
        }
        this.rows = [];
        var chunk = [], counter = 0;
        for (var c in this.cards) {
            if (this.cards.hasOwnProperty(c)) {
                chunk.push(this.cards[c]);
                counter++;
                if (counter >= 4) {
                    counter = 0;
                    this.rows.push(chunk);
                    chunk = [];
                }
            }
        }
        if (counter > 0) {
            this.rows.push(chunk);
        }
    };
    AbstractSearchComponent.prototype.select = function (id) {
        if (this.selectedId === id) {
            this.selectedId = null;
        }
        else {
            this.selectedId = id;
        }
    };
    AbstractSearchComponent.prototype.search = function (data) {
        this.searchData = data;
        this.selectedId = null;
        this.searching();
    };
    AbstractSearchComponent.prototype.changeOffset = function (data) {
        this.limit = data.pageSize ? data.pageSize : 10;
        this.offset = data.pageIndex * this.limit;
        this.searching();
    };
    AbstractSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-abstract-search',
            template: "",
            styles: []
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__services_progress_service__["a" /* ProgressService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["g" /* Router */], __WEBPACK_IMPORTED_MODULE_4__angular_material__["f" /* MatDialog */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["t" /* MatSnackBar */], __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */]])
    ], AbstractSearchComponent);
    return AbstractSearchComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/components/removing-confirm/removing-confirm.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".sub-title{\r\n    font-size: 0.8em;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/components/removing-confirm/removing-confirm.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"center\">\r\n  <mat-card-header>\r\n    Removing Confirmation\r\n  </mat-card-header>\r\n  <mat-card-content class=\"page\">\r\n    <div>\r\n      Are you sure to remove\r\n      <span *ngIf=\"name\">\"{{name}}\"</span>\r\n      <span *ngIf=\"!name\"> entity </span>\r\n      permanently?\r\n    </div>\r\n    <div class=\"sub-title\">Removing {{name}} may caused other parts to be removed</div>\r\n    <br/>\r\n    <div fxLayout=\"row\" rxLayout.xs=\"column\" fxLayoutAlign=\"center center\">\r\n      <div fxFlex=\"50\" role=\"yes-btn\" style=\"display: inline-block\">\r\n        <button mat-icon-button (click)=\"remove(true)\">\r\n          <mat-icon aria-label=\"yes\">done</mat-icon>\r\n        </button>\r\n      </div>\r\n      <div fxFlex=\"50\" role=\"no-btn\" style=\"display: inline-block\">\r\n        <button mat-icon-button (click)=\"remove(false)\">\r\n          <mat-icon aria-label=\"no\">clear</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/components/removing-confirm/removing-confirm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemovingConfirmComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
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


var RemovingConfirmComponent = /** @class */ (function () {
    function RemovingConfirmComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.name = null;
    }
    RemovingConfirmComponent.prototype.ngOnInit = function () {
        this.name = (this.data && this.data.name) ? this.data.name : null;
    };
    RemovingConfirmComponent.prototype.remove = function (answer) {
        this.dialogRef.close(answer);
    };
    RemovingConfirmComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-removing-confirm',
            template: __webpack_require__("../../../../../src/app/shared/components/removing-confirm/removing-confirm.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/components/removing-confirm/removing-confirm.component.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogRef */], Object])
    ], RemovingConfirmComponent);
    return RemovingConfirmComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/components/search-fields/search-fields.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".trg-btn{\r\n  margin-right: 5px;\r\n  margin-top: 5px;\r\n  margin-bottom: 5px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/components/search-fields/search-fields.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header>\r\n    <mat-card-title>\r\n      Filtering Options\r\n    </mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    <div class=\"flex-container\" fxLayout=\"row\" fxLayout.sm=\"column\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\"\r\n         fxLayoutAlign.sm=\"center center\" fxLayoutAlign.xs=\"center center\">\r\n      <div *ngIf=\"!target\" class=\"flex-item\" fxFlex=\"30\" fxFlex.sm=\"50\" fxFlex.xs=\"50\" role=\"add-target-button\">\r\n        <button id=\"m\" mat-raised-button [matMenuTriggerFor]=\"menu\">Target</button>\r\n        <mat-menu #menu=\"matMenu\">\r\n          <button *ngFor=\"let trg of targetList; let i = index;\" mat-menu-item (click)=\"addTarget(i)\"\r\n                  role=\"'target-button' + i\">{{trg}}\r\n          </button>\r\n        </mat-menu>\r\n        <div *ngIf=\"targets.length > 0\">Search in:</div>\r\n        <button *ngFor=\"let trg of targets\" class=\"trg-btn\" mat-raised-button color=\"primary\"\r\n                (click)=\"removeTarget(trg)\" role=\"remove-target-button\">{{trg}}\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <div class=\"field\" fxFlex=\"70\" fxFlex.sm=\"50\" fxFlex.xs=\"50\">\r\n      <form>\r\n        <div class=\"field-container\">\r\n          <mat-input-container class=\"field\">\r\n            <input class=\"field\" matInput type=\"text\" placeholder=\"phrase\" [formControl]=\"searchCtrl\"\r\n                   role=\"phrase-field\">\r\n          </mat-input-container>\r\n        </div>\r\n        <div *ngIf=\"target === targetEnum.page\">\r\n          <mat-checkbox name=\"is_app\" [ngModel]=\"isApp\" (change)=\"changeState(elementEnum.isApp)\"\r\n                        [indeterminate]=\"isApp == null\" role=\"is-app-button\">Is App Page\r\n          </mat-checkbox>\r\n        </div>\r\n        <div *ngIf=\"target === targetEnum.collection\">\r\n          <mat-checkbox name=\"is_smart\" [ngModel]=\"isSmart\" (change)=\"changeState(elementEnum.isSmart)\"\r\n                        [indeterminate]=\"isSmart == null\" role=\"is-smart-button\">Is Smart Page\r\n          </mat-checkbox>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/components/search-fields/search-fields.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchFieldsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enum_target_enum__ = __webpack_require__("../../../../../src/app/shared/enum/target.enum.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ElementEnum;
(function (ElementEnum) {
    ElementEnum[ElementEnum["isSmart"] = 0] = "isSmart";
    ElementEnum[ElementEnum["isApp"] = 1] = "isApp";
})(ElementEnum || (ElementEnum = {}));
var SearchFieldsComponent = /** @class */ (function () {
    function SearchFieldsComponent() {
        this.target = null;
        this.searching = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.targets = [];
        this.targetList = [];
        this.searchCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.targetEnum = __WEBPACK_IMPORTED_MODULE_2__enum_target_enum__["a" /* TargetEnum */];
        this.elementEnum = ElementEnum;
        this.phrase = null;
        this.isApp = null;
        this.isSmart = null;
        this._initItems = null;
    }
    Object.defineProperty(SearchFieldsComponent.prototype, "initItems", {
        get: function () {
            return this._initItems;
        },
        set: function (value) {
            this._initItems = value;
            this.setInitSearchData();
        },
        enumerable: true,
        configurable: true
    });
    SearchFieldsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchCtrl.valueChanges.debounceTime(500).subscribe(function (data) {
            _this.phrase = data.trim() !== '' ? data.trim() : null;
            _this.searchOnData();
        }, function (err) {
            console.log('Couldn\'t refresh', err);
        });
    };
    SearchFieldsComponent.prototype.addTarget = function (target_index) {
    };
    SearchFieldsComponent.prototype.removeTarget = function (trg) {
    };
    SearchFieldsComponent.prototype.searchOnData = function (phrase) {
        if (!phrase) {
            phrase = this.phrase;
        }
        var trg = {};
        this.targets.forEach(function (el) {
            trg[el] = true;
        });
        var searchData = {
            options: {
                phrase: phrase,
                is_app: this.isApp,
                is_smart: this.isSmart,
                show_all: (this.target
                    && (phrase === null || phrase === '')
                    && this.isApp === null),
            }
        };
        this.searching.emit(searchData);
    };
    SearchFieldsComponent.prototype.changeState = function (element) {
        switch (element) {
            case this.elementEnum.isApp:
                if (this.isApp === null)
                    this.isApp = true;
                else if (this.isApp === true)
                    this.isApp = false;
                else if (this.isApp === false)
                    this.isApp = null;
                break;
            case this.elementEnum.isSmart:
                if (this.isSmart === null)
                    this.isSmart = true;
                else if (this.isSmart === true)
                    this.isSmart = false;
                else if (this.isSmart === false)
                    this.isSmart = null;
                break;
        }
        this.searchOnData();
    };
    SearchFieldsComponent.prototype.setInitSearchData = function () {
        if (this.initItems) {
            this.searchCtrl.setValue(this.initItems.phrase ? this.initItems.phrase : null);
            this.phrase = this.initItems.phrase ? this.initItems.phrase : null;
            this.isApp = this.initItems.options.is_app ? this.initItems.options.is_app : null;
            this.isSmart = this.initItems.options.is_smart ? this.initItems.options.is_smart : null;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SearchFieldsComponent.prototype, "target", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], SearchFieldsComponent.prototype, "initItems", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SearchFieldsComponent.prototype, "searching", void 0);
    SearchFieldsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-search-fields',
            template: __webpack_require__("../../../../../src/app/shared/components/search-fields/search-fields.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/components/search-fields/search-fields.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SearchFieldsComponent);
    return SearchFieldsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/components/suggestion/suggestion.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-input-container {\r\n  width: 100%;\r\n  direction: rtl;\r\n  text-align: right;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/components/suggestion/suggestion.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-input-container class=\"field\">\r\n  <input matInput type=\"text\" placeholder=\"{{placeholder}}\" [matAutocomplete]=\"auto\" [formControl]=\"suggestionCtrl\"/>\r\n  <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"addItem($event)\">\r\n    <mat-option *ngFor=\"let item of filteredItems\" [value]=\"item._id\" class=\"farsi\">\r\n\r\n      <span *ngIf=\"name === targetEnum.collection.toString()\">\r\n        {{item.name}}\r\n      </span>\r\n      <span *ngIf=\"name == targetEnum.product.toString()\">\r\n        {{item.name}} ({{item.product_type}} | {{item.brand}})\r\n      </span>\r\n      <span *ngIf=\"name == targetEnum.tag.toString()\">\r\n        {{item.name}}\r\n      </span>\r\n    </mat-option>\r\n  </mat-autocomplete>\r\n</mat-input-container>\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/components/suggestion/suggestion.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuggestionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_progress_service__ = __webpack_require__("../../../../../src/app/shared/services/progress.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__enum_target_enum__ = __webpack_require__("../../../../../src/app/shared/enum/target.enum.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import {Observable} from "rxjs/Observable";
// import {map} from "rxjs/operator/map";



var SuggestionComponent = /** @class */ (function () {
    function SuggestionComponent(httpService, progressService) {
        this.httpService = httpService;
        this.progressService = progressService;
        this.name = '';
        this.placeholder = null;
        this.fieldName = '';
        this.currentIds = [];
        this.add = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.targetEnum = __WEBPACK_IMPORTED_MODULE_5__enum_target_enum__["a" /* TargetEnum */];
        this.filteredItems = [];
    }
    SuggestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.placeholder)
            this.placeholder = this.name;
        this.suggestionCtrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.suggestionCtrl.valueChanges.debounceTime(150).subscribe(function (data) {
            _this.filtering(data);
        }, function (err) {
            _this.filteredItems = [];
        });
    };
    SuggestionComponent.prototype.addItem = function (data) {
        var item = this.filteredItems.filter(function (el) { return el._id.toLowerCase() === data.option.value.toLowerCase(); })[0];
        this.add.emit(item);
        this.suggestionCtrl.setValue('');
    };
    SuggestionComponent.prototype.filtering = function (phrase) {
        var _this = this;
        if ((!phrase || phrase === '') || phrase.length < 3)
            this.filteredItems = [];
        else {
            this.progressService.enable();
            this.httpService.post("suggest/" + this.name, {
                phrase: phrase
            }).subscribe(function (data) {
                _this.filteredItems = data;
                _this.progressService.disable();
            }, function (err) {
                _this.filteredItems = [];
                _this.progressService.disable();
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SuggestionComponent.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], SuggestionComponent.prototype, "placeholder", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SuggestionComponent.prototype, "fieldName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], SuggestionComponent.prototype, "currentIds", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SuggestionComponent.prototype, "add", void 0);
    SuggestionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-suggestion',
            template: __webpack_require__("../../../../../src/app/shared/components/suggestion/suggestion.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/components/suggestion/suggestion.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__services_progress_service__["a" /* ProgressService */]])
    ], SuggestionComponent);
    return SuggestionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/enum/progressMode.enum.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressModeEnum; });
var ProgressModeEnum;
(function (ProgressModeEnum) {
    ProgressModeEnum["determinate"] = "determinate";
    ProgressModeEnum["indeterminate"] = "indeterminate";
    ProgressModeEnum["buffer"] = "buffer";
    ProgressModeEnum["query"] = "query";
})(ProgressModeEnum || (ProgressModeEnum = {}));


/***/ }),

/***/ "../../../../../src/app/shared/enum/target.enum.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TargetEnum; });
var TargetEnum;
(function (TargetEnum) {
    TargetEnum["product"] = "Product";
    TargetEnum["collection"] = "Collection";
    TargetEnum["page"] = "Page";
    TargetEnum["tag"] = "Tag";
})(TargetEnum || (TargetEnum = {}));


/***/ }),

/***/ "../../../../../src/app/shared/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/_esm5/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = /** @class */ (function () {
    function AuthService(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.defaultDisplayName = 'Anonymous user';
        this.isLoggedIn = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
        this.isVerified = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
        this.userDetails = {
            isAgent: null,
            accessLevel: null,
            userId: null,
            displayName: this.defaultDisplayName,
            username: null,
        };
    }
    AuthService.prototype.checkValidation = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpService.get((url.includes('agent') ? 'agent' : '') + '/validUser').subscribe(function (data) {
                _this.userDetails = {
                    isAgent: data.personType === 'agent',
                    userId: data.pid,
                    displayName: data.displayName,
                    accessLevel: data.hasOwnProperty('access_level') ? data.access_level : null,
                    username: data.username,
                };
                _this.isLoggedIn.next(true);
                _this.isVerified.next(data.is_verified ? data.is_verified : false);
                resolve();
            }, function (err) {
                _this.userDetails = {
                    isAgent: null,
                    accessLevel: null,
                    userId: null,
                    displayName: _this.defaultDisplayName,
                    username: null,
                };
                _this.isLoggedIn.next(false);
                reject();
            });
        });
    };
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpService.post((_this.router.url.includes('agent') ? 'agent/' : '') + 'login', {
                username: username,
                password: password
            }).subscribe(function (data) {
                _this.isLoggedIn.next(true);
                _this.isVerified.next(data.is_verified ? data.is_verified : false);
                _this.userDetails = {
                    isAgent: data.personType === 'agent',
                    userId: data.pid,
                    displayName: data.displayName,
                    accessLevel: data.hasOwnProperty('access_level') ? data.access_level : null,
                    username: data.username,
                };
                resolve();
            }, function (err) {
                _this.isLoggedIn.next(false);
                _this.isVerified.next(false);
                console.error('Error in login: ', err);
                _this.userDetails = {
                    isAgent: null,
                    accessLevel: null,
                    userId: null,
                    displayName: _this.defaultDisplayName,
                    username: null,
                };
                reject();
            });
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpService.get('logout').subscribe(function (data) {
                // const rt = (this.router.url.includes('admin') ? 'admin/' : '') + 'login';
                _this.isLoggedIn.next(false);
                _this.isVerified.next(data.is_verified ? data.is_verified : false);
                _this.userDetails = {
                    isAgent: null,
                    userId: null,
                    displayName: _this.defaultDisplayName,
                    accessLevel: null,
                    username: null
                };
                // this.router.navigate([rt]);
                resolve();
            }, function (err) {
                console.error('Cannot logout: ', err);
                reject();
            });
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["g" /* Router */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/services/http.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HttpService = /** @class */ (function () {
    function HttpService(http) {
        this.http = http;
        this.serverAddress = '/api/';
    }
    HttpService.prototype.get = function (url) {
        return this.http.get(this.serverAddress + url, { observe: 'response' }).map(function (data) { return data.body; });
    };
    HttpService.prototype.put = function (url, values) {
        return this.http.put(this.serverAddress + url, values, { observe: 'response' }).map(function (data) { return data.body; });
    };
    HttpService.prototype.post = function (url, values) {
        return this.http.post(this.serverAddress + url, values, { observe: 'response' }).map(function (data) { return data.body; });
    };
    HttpService.prototype.delete = function (url) {
        return this.http.delete(this.serverAddress + url, { observe: 'response' }).map(function (data) { return data.body; });
    };
    HttpService.Host = 'http://localhost:3000';
    HttpService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], HttpService);
    return HttpService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/services/placement.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacementService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var defaultComponents = ['menu', 'slider', 'logos'];
var PlacementService = /** @class */ (function () {
    function PlacementService(http) {
        this.http = http;
        this.cache = {};
        this.homeComponents = {};
        this.placement$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["b" /* Subject */]();
        this.getPlacements('home', false);
    }
    PlacementService.prototype.classifyPlacements = function (pageName, data) {
        var _this = this;
        var components = Array.from(new Set(data.map(function (r) { return r.component_name; })));
        var dataSplit = components.map(function (c) { return data.filter(function (r) { return r.component_name === c; }); });
        if (pageName === 'home') {
            defaultComponents.forEach(function (r) {
                _this.homeComponents[r] = dataSplit[components.indexOf(r)];
            });
        }
        else {
            defaultComponents.forEach(function (r) {
                if (!components.includes(r)) {
                    components.push(r);
                    dataSplit.push(_this.homeComponents[r]);
                }
            });
        }
        return [components, dataSplit];
    };
    PlacementService.prototype.emitPlacements = function (placements) {
        var _this = this;
        var components, dataSplit;
        components = placements[0], dataSplit = placements[1];
        components.forEach(function (c, i) {
            _this.placement$.next([c, dataSplit[i]]);
        });
    };
    PlacementService.prototype.getPlacements = function (pageName, emit) {
        var _this = this;
        if (emit === void 0) { emit = true; }
        var i = setInterval(function () {
            if (pageName === 'home' || _this.homeComponents.menu) {
                clearInterval(i);
                if (!_this.cache[pageName]) {
                    _this.http.get('assets/test_input_for_menu.json').subscribe(function (data) {
                        _this.cache[pageName] = _this.classifyPlacements(pageName, data.placement);
                        if (emit) {
                            _this.emitPlacements(_this.cache[pageName]);
                        }
                    }, function (err) {
                        console.log('err: ', err);
                    });
                }
                else if (emit) {
                    _this.emitPlacements(_this.cache[pageName]);
                }
            }
        }, 500);
    };
    PlacementService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], PlacementService);
    return PlacementService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/services/progress.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_progressMode_enum__ = __webpack_require__("../../../../../src/app/shared/enum/progressMode.enum.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/_esm5/ReplaySubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProgressService = /** @class */ (function () {
    function ProgressService() {
        this.progressModeEnum = __WEBPACK_IMPORTED_MODULE_1__enum_progressMode_enum__["a" /* ProgressModeEnum */];
        this.showProgress = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
        this.progressMode = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
        this.progressValue = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
        this.progressBufferValue = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
        this.showProgress.next(false);
        // Set default values
        this.progressMode.next(this.progressModeEnum.indeterminate);
        this.progressValue.next(50);
        this.progressBufferValue.next(null);
    }
    ProgressService.prototype.enable = function () {
        this.showProgress.next(true);
    };
    ProgressService.prototype.disable = function () {
        this.showProgress.next(false);
    };
    ProgressService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], ProgressService);
    return ProgressService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/services/socket.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SocketService = /** @class */ (function () {
    function SocketService() {
        var _this = this;
        this.url = 'http://localhost:3000';
        this.socketConfig = {
            transports: ['websocket']
        };
        this.orderLineObsevable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */](function (observer) {
            _this.orderLineSocket.on('ans', function (data) {
                observer.next(data);
            });
        });
    }
    SocketService.prototype.init = function () {
        this.orderLineSocket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__(this.url + '/orderline', this.socketConfig);
    };
    SocketService.prototype.getOrderLineMessage = function () {
        return this.orderLineObsevable;
    };
    SocketService.prototype.disconnect = function () {
        this.orderLineSocket.disconnect();
    };
    SocketService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], SocketService);
    return SocketService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/services/window.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WINDOW; });
/* unused harmony export WindowRef */
/* unused harmony export BrowserWindowRef */
/* unused harmony export windowProvider */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return WINDOW_PROVIDERS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/* Create a new injection token for injecting the window into a component. */
var WINDOW = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('WindowToken');
/* Define abstract class for obtaining reference to the global window object. */
var WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "nativeWindow", {
        get: function () {
            throw new Error('Not implemented.');
        },
        enumerable: true,
        configurable: true
    });
    return WindowRef;
}());

/* Define class that implements the abstract class and returns the native window object. */
var BrowserWindowRef = /** @class */ (function (_super) {
    __extends(BrowserWindowRef, _super);
    function BrowserWindowRef() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BrowserWindowRef.prototype, "nativeWindow", {
        get: function () {
            return window;
        },
        enumerable: true,
        configurable: true
    });
    return BrowserWindowRef;
}(WindowRef));

/* Create an factory function that returns the native window object. */
function windowFactory(browserWindowRef, platformId) {
    if (Object(__WEBPACK_IMPORTED_MODULE_0__angular_common__["isPlatformBrowser"])(platformId)) {
        return browserWindowRef.nativeWindow;
    }
    return {};
}
/* Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class. */
var browserWindowProvider = {
    provide: WindowRef,
    useClass: BrowserWindowRef
};
/* Create an injectable provider that uses the windowFactory function for returning the native window object. */
var windowProvider = {
    provide: WINDOW,
    useFactory: windowFactory,
    deps: [WindowRef, __WEBPACK_IMPORTED_MODULE_1__angular_core__["PLATFORM_ID"]]
};
/* Create an array of providers. */
var WINDOW_PROVIDERS = [
    browserWindowProvider,
    windowProvider
];


/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_suggestion_suggestion_component__ = __webpack_require__("../../../../../src/app/shared/components/suggestion/suggestion.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_search_fields_search_fields_component__ = __webpack_require__("../../../../../src/app/shared/components/search-fields/search-fields.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_abstract_search_abstract_search_component__ = __webpack_require__("../../../../../src/app/shared/components/abstract-search/abstract-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_removing_confirm_removing_confirm_component__ = __webpack_require__("../../../../../src/app/shared/components/removing-confirm/removing-confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_cdk_bidi__ = __webpack_require__("../../../cdk/esm5/bidi.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                // CollectionHeaderComponent,
                // FilteringPanelComponent,
                // FooterComponent,
                // GenDialogComponent,
                // HeaderComponent,
                // MobileHeaderComponent,
                // ProductGridItemComponent,
                // SizeOptionsComponent,
                // SlidingHeaderComponent,
                __WEBPACK_IMPORTED_MODULE_5__components_search_fields_search_fields_component__["a" /* SearchFieldsComponent */],
                __WEBPACK_IMPORTED_MODULE_1__components_suggestion_suggestion_component__["a" /* SuggestionComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_search_fields_search_fields_component__["a" /* SearchFieldsComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_abstract_search_abstract_search_component__["a" /* AbstractSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_removing_confirm_removing_confirm_component__["a" /* RemovingConfirmComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__["a" /* FlexLayoutModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["w" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["m" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["o" /* MatOptionModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_cdk_bidi__["a" /* BidiModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MatCheckboxModule */],
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_8__components_removing_confirm_removing_confirm_component__["a" /* RemovingConfirmComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__components_suggestion_suggestion_component__["a" /* SuggestionComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_search_fields_search_fields_component__["a" /* SearchFieldsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_removing_confirm_removing_confirm_component__["a" /* RemovingConfirmComponent */],
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map