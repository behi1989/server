webpackJsonp(["page.module"],{

/***/ "../../../../../src/app/admin/page/components/basic-info/basic-info.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".row{\r\n  margin: 0px 10px;\r\n}\r\n\r\n.card-view {\r\n  direction: rtl;\r\n}\r\n\r\n.field-container{\r\n  width: 100%;\r\n  margin: 5px;\r\n}\r\n\r\n.field{\r\n  width: 100%;\r\n}\r\n\r\n.farsi{\r\n  direction:rtl;\r\n}\r\n\r\n.example-full-width {\r\n  width: 100%;\r\n  text-align: right;\r\n  margin: 0px 10px;\r\n\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/page/components/basic-info/basic-info.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"card-view\">\r\n  <mat-card-header>\r\n    <mat-card-title>\r\n      <div *ngIf=\"!id\">افزودن صفحه جدید</div>\r\n      <div *ngIf=\"id\">ویرایش صفحه</div>\r\n    </mat-card-title>\r\n\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n\r\n    <form (ngSubmit)=\"submitPage()\" [formGroup]=\"form\">\r\n\r\n      <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\" fxLayoutAlign.xs=\"center center\">\r\n\r\n        <div fxFlex=\"50\" class=\"field-container\">\r\n\r\n          <app-suggestion fxFlex=\"50\" [name]=\"'Collection'\" [currentIds]=\"collection ?  [collection._id] : []\"\r\n                          [fieldName]=\"'name'\"\r\n                          [placeholder]=\"'نام کالکشن'\" (add)=\"setCollection($event)\"></app-suggestion>\r\n          <h3 fxFlex=\"50\" dir=\"ltr\" style=\"text-align:center\"> {{collection ? collection.name : ''}} </h3>\r\n        </div>\r\n\r\n        <div fxFlex=\"50\" class=\"field-container\">\r\n          <mat-input-container class=\"field\">\r\n            <input matInput type=\"text\" placeholder=\"آدرس\" formControlName=\"address\"\r\n                   role=\"address\" tabindex=\"2\" dir=\"ltr\">\r\n            <mat-hint>آدرس صفحه را وارد کنید</mat-hint>\r\n            <mat-error *ngIf=\"form.controls['address'].hasError('required') && anyChanges\">\r\n              وارد کردن آدرس صفحه الزامی است\r\n            </mat-error>\r\n          </mat-input-container>\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\" fxLayoutAlign.xs=\"center center\">\r\n        <div fxFlex=\"50\" class=\"field-container\">\r\n\r\n          <mat-checkbox formControlName=\"is_app\" role=\"is_app\" dir=\"ltr\">\r\n            Is App?\r\n          </mat-checkbox>\r\n        </div>\r\n      </div>\r\n\r\n      <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\" fxLayoutAlign.xs=\"center center\">\r\n\r\n        <mat-form-field class=\"example-full-width\" >\r\n          <textarea formControlName=\"content\" matInput placeholder=\"محتوا به صورت Mark Down\" ></textarea>\r\n        </mat-form-field>\r\n      </div>\r\n      <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\" fxLayoutAlign.xs=\"center center\">\r\n\r\n        <markdown *ngIf=\"form.controls['content'].value\" [data]=\"form.controls['content'].value\"></markdown>\r\n\r\n      </div>\r\n\r\n\r\n      <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\" fxLayoutAlign.xs=\"center center\">\r\n\r\n        <div role=\"submit-button\" style=\"text-align: left; margin-top: 10px;\">\r\n          <button mat-icon-button type=\"submit\"\r\n                  [disabled]=\"upsertBtnShouldDisabled || (!form.valid || (id && !anyChanges))\"\r\n                  tabindex=\"3\">\r\n            <mat-icon aria-label=\"accept\">done</mat-icon>\r\n          </button>\r\n        </div>\r\n\r\n      </div>\r\n\r\n\r\n    </form>\r\n\r\n  </mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/page/components/basic-info/basic-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_progress_service__ = __webpack_require__("../../../../../src/app/shared/services/progress.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BasicInfoComponent = /** @class */ (function () {
    function BasicInfoComponent(route, progressService, httpService, snackBar) {
        this.route = route;
        this.progressService = progressService;
        this.httpService = httpService;
        this.snackBar = snackBar;
        this.id = null;
        this.originalForm = null;
        this.collection = null;
        this.anyChanges = false;
        this.upsertBtnShouldDisabled = false;
    }
    BasicInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.route.params.subscribe(function (params) {
            _this.id = params['id'] && params['id'] !== 'null' ? params['id'] : null;
            _this.initPageInfo();
        });
        this.form.valueChanges.subscribe(function (data) {
            _this.fieldChanged();
        }, function (err) {
            console.error('->', err);
        });
    };
    BasicInfoComponent.prototype.initForm = function () {
        this.form = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]().group({
            address: [, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]],
            is_app: [false],
            content: []
        }, {});
    };
    BasicInfoComponent.prototype.initPageInfo = function () {
        var _this = this;
        if (!this.id) {
            this.form = null;
            this.initForm();
            return;
        }
        this.progressService.enable();
        this.upsertBtnShouldDisabled = true;
        this.httpService.get("page/" + this.id).subscribe(function (data) {
            data = data[0];
            _this.form.controls['address'].setValue(data.address);
            _this.form.controls['is_app'].setValue(data.is_app);
            _this.form.controls['content'].setValue(data.page_info.content);
            _this.collection = {
                _id: data.collection._id,
                name: data.collection.name
            };
            _this.originalForm = data;
            _this.progressService.disable();
            _this.upsertBtnShouldDisabled = false;
        }, function (error) {
            console.log(error);
            _this.snackBar.open('Cannot get page details. Please try again', null, {
                duration: 2500,
            });
            _this.progressService.disable();
            _this.upsertBtnShouldDisabled = false;
        });
    };
    BasicInfoComponent.prototype.submitPage = function () {
        var _this = this;
        var data = {
            address: this.form.controls['address'].value,
            is_app: this.form.controls['is_app'].value,
            collection_id: this.collection ? this.collection._id : null,
            content: this.form.controls['content'].value
        };
        this.progressService.enable();
        this.upsertBtnShouldDisabled = true;
        var func;
        if (!this.id)
            func = this.httpService.put("page", data);
        else
            func = this.httpService.post("page/" + this.id, data);
        func.subscribe(function (result) {
            _this.snackBar.open('page is ' + (_this.id ? 'updated' : 'added'), null, {
                duration: 2300,
            });
            _this.anyChanges = false;
            if (!_this.id) {
                _this.form.reset();
                _this.collection = null;
            }
            _this.progressService.disable();
            _this.upsertBtnShouldDisabled = false;
        }, function (error) {
            _this.snackBar.open("Cannot " + (!_this.id ? 'add' : 'update') + " ' this page. Try again", null, {
                duration: 3200,
            });
            _this.progressService.disable();
            _this.upsertBtnShouldDisabled = false;
            console.log(error);
        });
    };
    BasicInfoComponent.prototype.fieldChanged = function () {
        var _this = this;
        if (!this.originalForm)
            return;
        this.anyChanges = false;
        Object.keys(this.form.controls).forEach(function (el) {
            var formValue = _this.form.controls[el].value;
            var originalValue = _this.originalForm[el];
            if (typeof formValue === 'string')
                if (formValue && formValue.trim().length <= 0)
                    formValue = null;
                else if (formValue)
                    formValue = formValue.trim();
            if (typeof originalValue === 'string')
                if (originalValue && originalValue.trim().length <= 0)
                    originalValue = null;
                else if (originalValue)
                    originalValue = originalValue.trim();
            if (formValue !== originalValue && (formValue !== '' || originalValue !== null))
                _this.anyChanges = true;
        });
    };
    BasicInfoComponent.prototype.setCollection = function (collection) {
        this.collection = collection;
    };
    BasicInfoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-form',
            template: __webpack_require__("../../../../../src/app/admin/page/components/basic-info/basic-info.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/page/components/basic-info/basic-info.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_5__shared_services_progress_service__["a" /* ProgressService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__angular_material__["t" /* MatSnackBar */]])
    ], BasicInfoComponent);
    return BasicInfoComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/page/page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card-view {\r\n    margin: 10px;\r\n    -webkit-box-shadow: 10px 10px 80px grey;\r\n            box-shadow: 10px 10px 80px grey;\r\n    /*border: 1px solid gray;*/\r\n}\r\n\r\nmat-card {\r\n    cursor: pointer;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/page/page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" fxLayout=\"row\">\r\n  <app-search-fields fxFlex=\"100\"  [initItems]=\"initSearchData\" [target]=\"'page'\" (searching)=\"search($event)\"></app-search-fields>\r\n</div>\r\n<div fxLayout=\"row\" class=\"row\">\r\n  <button mat-fab color=\"accent\" (click)=\"openForm()\" style=\"margin-top: 15px\">\r\n    <mat-icon aria-label=\"Add new Collection\">add</mat-icon>\r\n  </button>\r\n</div>\r\n<div *ngFor=\"let r of rows\">\r\n  <div fxLayout=\"row\" fxLayout.sm=\"column\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\" fxLayoutAlign.sm=\"center center\" fxLayoutAlign.xs=\"center center\" class=\"row\">\r\n    <div fxFlex=\"25\" *ngFor=\"let c of r\" class=\"outer-card\">\r\n      <mat-card class=\"card-view\" (click)=\"select(c._id)\" [ngClass]=\"{'mat-elevation-z24': c._id === selectedId}\">\r\n        <mat-card-header>\r\n          <mat-card-title>\r\n            <a href=\"#\" >{{c.address}}</a>\r\n          </mat-card-title>\r\n          <mat-card-subtitle>\r\n            <span *ngIf=\"c.is_app !== 'true'\">Site Page</span>\r\n            <span *ngIf=\"c.is_app === 'true'\">App Page</span>\r\n          </mat-card-subtitle>\r\n        </mat-card-header>\r\n        <mat-card-actions *ngIf=\"c._id == selectedId\">\r\n          <button mat-icon-button (click)=\"openView(c._id)\" color=\"primary\">\r\n            <mat-icon aria-label=\"view\">visibility</mat-icon>\r\n          </button>\r\n          <button mat-icon-button (click)=\"openForm(c._id)\" color=\"accent\">\r\n            <mat-icon aria-label=\"edit\">edit</mat-icon>\r\n          </button>\r\n          <button mat-icon-button (click)=\"deletePage(c._id)\" color=\"warn\">\r\n            <mat-icon aria-label=\"delete\">delete</mat-icon>\r\n          </button>\r\n        </mat-card-actions>\r\n      </mat-card>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div>\r\n  <mat-paginator [length]=\"totalCards\" [pageSize]=\"8\" [pageSizeOptions]=\"[4, 8, 16, 32]\"\r\n                 (page)=\"changeOffset($event)\"></mat-paginator>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/page/page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_components_abstract_search_abstract_search_component__ = __webpack_require__("../../../../../src/app/shared/components/abstract-search/abstract-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_components_removing_confirm_removing_confirm_component__ = __webpack_require__("../../../../../src/app/shared/components/removing-confirm/removing-confirm.component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PageComponent = /** @class */ (function (_super) {
    __extends(PageComponent, _super);
    function PageComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageComponent.prototype.ngOnInit = function () {
        this.key = 'Page';
        _super.prototype.ngOnInit.call(this);
    };
    PageComponent.prototype.openForm = function (id) {
        if (id === void 0) { id = null; }
        this.router.navigate(["/agent/pages/info/" + id]);
    };
    PageComponent.prototype.deletePage = function (id) {
        var _this = this;
        if (id === void 0) { id = null; }
        var rmDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__shared_components_removing_confirm_removing_confirm_component__["a" /* RemovingConfirmComponent */], {
            width: '400px',
        });
        rmDialog.afterClosed().subscribe(function (status) {
            if (status) {
                _this.progressService.enable();
                _this.httpService.delete("/page/" + id).subscribe(function (data) {
                    _this.snackBar.open('Page delete successfully', null, {
                        duration: 2000,
                    });
                    _this.progressService.disable();
                    _this.searching();
                }, function (error) {
                    _this.snackBar.open('Cannot delete this page. Please try again', null, {
                        duration: 2700
                    });
                    _this.progressService.disable();
                });
            }
        }, function (err) {
            console.log('Error in dialog: ', err);
        });
    };
    PageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page',
            template: __webpack_require__("../../../../../src/app/admin/page/page.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/page/page.component.css")]
        })
    ], PageComponent);
    return PageComponent;
}(__WEBPACK_IMPORTED_MODULE_1__shared_components_abstract_search_abstract_search_component__["a" /* AbstractSearchComponent */]));



/***/ }),

/***/ "../../../../../src/app/admin/page/page.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageModule", function() { return PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_routing__ = __webpack_require__("../../../../../src/app/admin/page/page.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_component__ = __webpack_require__("../../../../../src/app/admin/page/page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_basic_info_basic_info_component__ = __webpack_require__("../../../../../src/app/admin/page/components/basic-info/basic-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_markdown__ = __webpack_require__("../../../../angular2-markdown/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var PageModule = /** @class */ (function () {
    function PageModule() {
    }
    PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__page_component__["a" /* PageComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_basic_info_basic_info_component__["a" /* BasicInfoComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__page_routing__["a" /* PageRouting */],
                __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["m" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["u" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["r" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["v" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["p" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["r" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["v" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_file_upload__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_10_angular2_markdown__["a" /* MarkdownModule */].forRoot(),
            ],
        })
    ], PageModule);
    return PageModule;
}());



/***/ }),

/***/ "../../../../../src/app/admin/page/page.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageRouting; });
/* unused harmony export PageTestRouting */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router_testing__ = __webpack_require__("../../../router/esm5/testing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_component__ = __webpack_require__("../../../../../src/app/admin/page/page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_basic_info_basic_info_component__ = __webpack_require__("../../../../../src/app/admin/page/components/basic-info/basic-info.component.ts");




var PAGE_ROUTES = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__page_component__["a" /* PageComponent */], pathMatch: 'full' },
    { path: 'info/:id', component: __WEBPACK_IMPORTED_MODULE_3__components_basic_info_basic_info_component__["a" /* BasicInfoComponent */] },
];
var PageRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["h" /* RouterModule */].forChild(PAGE_ROUTES);
var PageTestRouting = __WEBPACK_IMPORTED_MODULE_1__angular_router_testing__["a" /* RouterTestingModule */].withRoutes(PAGE_ROUTES);


/***/ })

});
//# sourceMappingURL=page.module.chunk.js.map