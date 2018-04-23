webpackJsonp(["collections.module"],{

/***/ "../../../../../src/app/admin/collections/collections.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card-view {\r\n  margin: 10px;\r\n  /*box-shadow: 10px 10px 80px grey;*/\r\n  /*border: 1px solid gray;*/\r\n}\r\n\r\nmat-card {\r\n  cursor: pointer;\r\n}\r\n\r\n.is_smart {\r\n  padding-top: 10px;\r\n}\r\n\r\n.smart {\r\n  color: blue;\r\n}\r\n\r\n.manual {\r\n  color: gray;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/collections/collections.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" fxLayout=\"row\">\r\n  <app-search-fields fxFlex=\"100\" [target]=\"'Collection'\" (searching)=\"search($event)\"></app-search-fields>\r\n</div>\r\n<div fxLayout=\"row\" class=\"row\">\r\n  <button mat-fab color=\"accent\" (click)=\"openForm()\" style=\"margin-top: 15px\">\r\n    <mat-icon aria-label=\"Add new Collection\">add</mat-icon>\r\n  </button>\r\n</div>\r\n<div *ngFor=\"let r of rows\" dir=\"rtl\">\r\n  <div fxLayout=\"row\" fxLayout.sm=\"column\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\"\r\n       fxLayoutAlign.sm=\"center center\" fxLayoutAlign.xs=\"center center\" class=\"row\">\r\n    <div fxFlex=\"25\" *ngFor=\"let c of r\" class=\"outer-card\">\r\n      <mat-card class=\"card-view\" (click)=\"select(c._id)\" [ngClass]=\"{'mat-elevation-z24': c._id === selectedId}\">\r\n        <mat-card-header>\r\n          <mat-card-title>\r\n            <label class=\"name\">{{c.name}}</label>\r\n          </mat-card-title>\r\n          <mat-card-subtitle class=\"is_smart\">\r\n            <label class=\"smart\" *ngIf=\"c.is_smart\">Smart</label>\r\n            <label class=\"manual\" *ngIf=\"!c.is_smart\">Manual</label>\r\n          </mat-card-subtitle>\r\n        </mat-card-header>\r\n        <mat-card-actions style=\"text-align: left\" *ngIf=\"c._id == selectedId\">\r\n          <button mat-icon-button (click)=\"deleteCollection(c._id)\" color=\"warn\">\r\n            <mat-icon aria-label=\"delete\">delete</mat-icon>\r\n          </button>\r\n          <button mat-icon-button (click)=\"openForm(c._id)\" color=\"accent\">\r\n            <mat-icon aria-label=\"edit\">edit</mat-icon>\r\n          </button>\r\n          <button mat-icon-button (click)=\"openView(c._id)\" color=\"primary\">\r\n            <mat-icon aria-label=\"view\">visibility</mat-icon>\r\n          </button>\r\n        </mat-card-actions>\r\n      </mat-card>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div>\r\n  <mat-paginator [length]=\"totalCards\" [pageSize]=\"8\" [pageSizeOptions]=\"[4, 8, 16, 32]\"\r\n                 (page)=\"changeOffset($event)\"></mat-paginator>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/collections/collections.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionsComponent; });
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



var CollectionsComponent = /** @class */ (function (_super) {
    __extends(CollectionsComponent, _super);
    function CollectionsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollectionsComponent.prototype.ngOnInit = function () {
        this.key = 'Collection';
        _super.prototype.ngOnInit.call(this);
    };
    CollectionsComponent.prototype.openForm = function (id) {
        if (id === void 0) { id = null; }
        this.router.navigate(["/agent/collections/form/" + id]);
    };
    CollectionsComponent.prototype.openView = function (id) {
        if (id === void 0) { id = null; }
        this.router.navigate(["/agent/collections/" + id]);
    };
    CollectionsComponent.prototype.deleteCollection = function (id) {
        var _this = this;
        if (id === void 0) { id = null; }
        var rmDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__shared_components_removing_confirm_removing_confirm_component__["a" /* RemovingConfirmComponent */], {
            width: '400px'
        });
        rmDialog.afterClosed().subscribe(function (status) {
            if (status) {
                _this.progressService.enable();
                _this.httpService.delete("collection/" + id).subscribe(function (data) {
                    _this.selectedId = null;
                    _this.snackBar.open('Collection deleted successfully', null, {
                        duration: 2000,
                    });
                    _this.searching();
                    _this.progressService.disable();
                }, function (err) {
                    _this.snackBar.open('Cannot delete this product. Please try again.', null, {
                        duration: 2700,
                    });
                    console.log('Error', err);
                    _this.progressService.disable();
                });
            }
        }, function (err) {
            console.log('Error in dialog: ', err);
        });
    };
    CollectionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-collections',
            template: __webpack_require__("../../../../../src/app/admin/collections/collections.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/collections/collections.component.css")]
        })
    ], CollectionsComponent);
    return CollectionsComponent;
}(__WEBPACK_IMPORTED_MODULE_1__shared_components_abstract_search_abstract_search_component__["a" /* AbstractSearchComponent */]));



/***/ }),

/***/ "../../../../../src/app/admin/collections/collections.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionsModule", function() { return CollectionsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collections_component__ = __webpack_require__("../../../../../src/app/admin/collections/collections.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__collections_routing__ = __webpack_require__("../../../../../src/app/admin/collections/collections.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_view_view_component__ = __webpack_require__("../../../../../src/app/admin/collections/components/view/view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_form_form_component__ = __webpack_require__("../../../../../src/app/admin/collections/components/form/form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var CollectionsModule = /** @class */ (function () {
    function CollectionsModule() {
    }
    CollectionsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__collections_routing__["a" /* CollectionsRouting */],
                __WEBPACK_IMPORTED_MODULE_9__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_9__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__["a" /* FlexLayoutModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["m" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["r" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["k" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["u" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["p" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["j" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["r" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__["a" /* SharedModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__collections_component__["a" /* CollectionsComponent */],
                __WEBPACK_IMPORTED_MODULE_4__components_view_view_component__["a" /* ViewComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_form_form_component__["a" /* FormComponent */],
            ]
        })
    ], CollectionsModule);
    return CollectionsModule;
}());



/***/ }),

/***/ "../../../../../src/app/admin/collections/collections.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionsRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collections_component__ = __webpack_require__("../../../../../src/app/admin/collections/collections.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_view_view_component__ = __webpack_require__("../../../../../src/app/admin/collections/components/view/view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_form_form_component__ = __webpack_require__("../../../../../src/app/admin/collections/components/form/form.component.ts");




var Collections_ROUTES = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__collections_component__["a" /* CollectionsComponent */], pathMatch: 'full' },
    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_2__components_view_view_component__["a" /* ViewComponent */] },
    { path: 'form/:id', component: __WEBPACK_IMPORTED_MODULE_3__components_form_form_component__["a" /* FormComponent */] },
];
var CollectionsRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["h" /* RouterModule */].forChild(Collections_ROUTES);


/***/ }),

/***/ "../../../../../src/app/admin/collections/components/form/form.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".row{\r\n  margin: 0px 10px;\r\n}\r\n\r\n.card-view {\r\n  direction: rtl;\r\n}\r\n\r\n.field-container{\r\n  width: 100%;\r\n  margin: 5px;\r\n}\r\n\r\n.field{\r\n  width: 100%;\r\n}\r\n\r\n.farsi{\r\n  direction:rtl;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/collections/components/form/form.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"card-view\">\r\n  <mat-card-header>\r\n    <mat-card-title>\r\n      <div *ngIf=\"!collectionId\">افزودن کالکشن جدید</div>\r\n      <div *ngIf=\"collectionId\">ویرایش کالکشن</div>\r\n    </mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    <form (ngSubmit)=\"submitCollection()\" [formGroup]=\"collectionForm\">\r\n      <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\"\r\n           fxLayoutAlign.xs=\"center center\" dir=\"rtl\">\r\n        <div fxFlex=\"33\" class=\"field-container\">\r\n          <mat-input-container class=\"field farsi\">\r\n            <input matInput type=\"text\" placeholder=\"نام\" formControlName=\"colName\"\r\n                   role=\"colName\" tabindex=\"2\">\r\n            <mat-hint>نام کالکشن را وارد کنید</mat-hint>\r\n            <mat-error *ngIf=\"collectionForm.controls['colName'].hasError('required') && anyChanges\">\r\n              وارد کردن نام کالکشن الزامی است\r\n            </mat-error>\r\n          </mat-input-container>\r\n        </div>\r\n        <div fxFlex=\"33\" style=\"text-align:center; margin-top: 15px\" click=\"addPic()\">\r\n          <mat-checkbox name=\"is_smart\" [ngModel]=\"\" formControlName=\"is_smart\" role=\"is-smart\">\r\n            Is Smart\r\n          </mat-checkbox>\r\n        </div>\r\n        <div fxFlex=\"20\" role=\"submit-button\" style=\"text-align: left; margin-top: 10px;\">\r\n          <button mat-icon-button type=\"submit\"\r\n                  [disabled]=\"upsertBtnShouldDisabled || (!collectionForm.valid || (collectionId && !anyChanges))\"\r\n                  tabindex=\"3\">\r\n            <mat-icon aria-label=\"accept\">done</mat-icon>\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/collections/components/form/form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_util__ = __webpack_require__("../../../../util/util.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_progress_service__ = __webpack_require__("../../../../../src/app/shared/services/progress.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FormComponent = /** @class */ (function () {
    function FormComponent(route, progressService, httpService, snackBar) {
        this.route = route;
        this.progressService = progressService;
        this.httpService = httpService;
        this.snackBar = snackBar;
        this.collectionId = null;
        this.originalCollection = null;
        this.anyChanges = false;
        this.upsertBtnShouldDisabled = false;
    }
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.route.params.subscribe(function (params) {
            _this.collectionId = params['id'] && params['id'] !== 'null' ? params['id'] : null;
            _this.initCollectionInfo();
        });
        this.collectionForm.valueChanges.subscribe(function (data) {
            _this.fieldChanged();
        }, function (err) {
            console.error('ERR', err);
        });
    };
    FormComponent.prototype.initForm = function () {
        this.collectionForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]().group({
            colName: [null, [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                ]],
            is_smart: [null, []],
        }, {
            validator: this.basicInfoValidation
        });
    };
    FormComponent.prototype.initCollectionInfo = function () {
        var _this = this;
        if (!this.collectionId) {
            this.collectionForm = null;
            this.initForm();
            return;
        }
        this.progressService.enable();
        this.upsertBtnShouldDisabled = true;
        this.httpService.get("collection/" + this.collectionId).subscribe(function (data) {
            data = data[0];
            _this.collectionForm.controls['colName'].setValue(data.name);
            _this.collectionForm.controls['is_smart'].setValue(data.is_smart);
            _this.originalCollection = {
                _id: data._id,
                name: data.name,
                is_smart: data.is_smart
            };
            _this.progressService.disable();
            _this.upsertBtnShouldDisabled = false;
        }, function (error) {
            console.log(error);
            _this.snackBar.open('Cannot get collection details. Please try again', null, {
                duration: 2500,
            });
            _this.progressService.disable();
            _this.upsertBtnShouldDisabled = false;
        });
    };
    FormComponent.prototype.submitCollection = function () {
        var _this = this;
        var sendingData = {
            _id: this.collectionId,
            name: this.collectionForm.controls['colName'].value,
            is_smart: this.collectionForm.controls['is_smart'].value,
        };
        // if(this.collectionId)
        //   data['_id'] = this.collectionId;
        this.progressService.enable();
        this.upsertBtnShouldDisabled = true;
        this.httpService.put("collection", sendingData).subscribe(function (data) {
            var isCreating = false;
            if (data._id) {
                isCreating = true;
            }
            _this.snackBar.open('Collection is ' + (_this.collectionId ? 'updated' : 'added'), null, {
                duration: 2300,
            });
            _this.anyChanges = false;
            if (isCreating) {
                _this.collectionId = data._id;
                _this.originalCollection = Object.assign({ _id: data._id }, data);
                _this.collectionForm.reset();
            }
            // else {
            // this.collectionId = data._id;
            // this.originalCollection = Object.assign({_id: data._id}, data);
            // this.originalCollection.name = this.collectionForm.controls['colName'].value;
            // }
            _this.progressService.disable();
            _this.upsertBtnShouldDisabled = false;
        }, function (error) {
            _this.snackBar.open('Cannot ' + (_this.collectionId ? 'update' : 'add') + ' this collection. Try again', null, {
                duration: 3200,
            });
            _this.progressService.disable();
            _this.upsertBtnShouldDisabled = false;
            // console.log(error);
        });
    };
    FormComponent.prototype.fieldChanged = function () {
        if (!this.originalCollection) {
            return;
        }
        this.anyChanges = false;
        var colName = (this.collectionForm.controls['colName'].value === null ||
            Object(__WEBPACK_IMPORTED_MODULE_4_util__["isUndefined"])(this.collectionForm.controls['colName'].value)) ? '' : this.collectionForm.controls['colName'].value;
        colName = colName.trim();
        var orig_colName = this.originalCollection.name;
        orig_colName = orig_colName.trim();
        var is_smart = (this.collectionForm.controls['is_smart'].value === null ||
            Object(__WEBPACK_IMPORTED_MODULE_4_util__["isUndefined"])(this.collectionForm.controls['is_smart'].value)) ? '' : this.collectionForm.controls['is_smart'].value;
        var orig_is_smart = this.originalCollection.is_smart;
        if ((colName !== orig_colName && (colName !== '' || orig_colName !== null)) ||
            ((is_smart !== orig_is_smart && (is_smart !== '' || orig_is_smart !== null)))) {
            this.anyChanges = true;
        }
    };
    FormComponent.prototype.basicInfoValidation = function (AC) {
    };
    FormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-form',
            template: __webpack_require__("../../../../../src/app/admin/collections/components/form/form.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/collections/components/form/form.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_6__shared_services_progress_service__["a" /* ProgressService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["t" /* MatSnackBar */]])
    ], FormComponent);
    return FormComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/collections/components/view/view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".view-title {\r\n  font-family: irankharazmi;\r\n  font-weight: bold;\r\n  font-size: 1.3em;\r\n}\r\n\r\n.view-content {\r\n  font-family: irankharazmi;\r\n  font-weight: normal;\r\n  font-size: 1em;\r\n  padding-right: 10px;\r\n}\r\n\r\n.table thead {\r\n  font-family: irankharazmi;\r\n  font-weight: bold;\r\n}\r\n\r\n.table tbody {\r\n  font-family: irankharazmi;\r\n}\r\n\r\n.table td {\r\n  direction: rtl;\r\n}\r\n\r\n.table td:nth-child(1) {\r\n  padding: 2px 40px 2px 0;\r\n}\r\n\r\n.table td:nth-child(2) {\r\n  padding: 2px 40px 2px 0;\r\n}\r\n\r\n.table td:nth-child(3) {\r\n  padding: 2px 40px 2px 0;\r\n}\r\n\r\n.table td:nth-child(4) {\r\n  padding: 2px 40px 2px 0;\r\n}\r\n\r\n.table td:nth-child(5) {\r\n  padding: 2px 40px 2px 0;\r\n}\r\n\r\n.table td:nth-child(6) {\r\n  padding: 2px 10px 2px 0;\r\n}\r\n\r\n.little-right-margin {\r\n  margin-right: 20px;\r\n}\r\n\r\n.right-alignment {\r\n  direction: rtl;\r\n  text-align: right;\r\n}\r\n\r\n.font-yek {\r\n  font-family: iranyekan;\r\n}\r\n\r\n.shallow-border {\r\n  border: 1px solid gray;\r\n}\r\n\r\n.example-additional-selection {\r\n  opacity: 0.75;\r\n  font-size: 0.75em;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/collections/components/view/view.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\">\r\n  <mat-card fxFlex=\"80\" fxFlex.sm=\"100\" fxFlex.xs=\"100\" fxFlexOffset=\"10\" fxFlexOffset.sm=\"0\" fxFlexOffset.xs=\"0\">\r\n\r\n    <div class=\"rs-table\">\r\n      <mat-card-content>\r\n        <div fxLayout=\"row\" fxLayout.sm=\"column\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\"\r\n             fxLayoutAlign.sm=\"center center\" fxLayoutAlign.xs=\"center center\" class=\"right-alignment\">\r\n          <!--<div fxFlex=\"50\" style=\"text-align: right;\">-->\r\n          <div fxFlex=\"50\">\r\n            <div class=\"view-title\"><b>نام:</b></div>\r\n            <div class=\"view-content\">{{currentCollection?.name}}</div>\r\n          </div>\r\n          <!--<div fxFlex=\"50\" style=\"text-align: right;\">-->\r\n          <div fxFlex=\"50\">\r\n            <div class=\"view-title\"><b>نوع:</b></div>\r\n            <div class=\"view-content\" *ngIf=\"currentCollection?.is_smart\">اسمارت</div>\r\n            <div class=\"view-content\" *ngIf=\"!currentCollection?.is_smart\">منوال</div>\r\n          </div>\r\n        </div>\r\n        <br>\r\n      </mat-card-content>\r\n      <div *ngIf=\"!currentCollection?.is_smart\">\r\n        <div class=\"little-right-margin right-alignment\">\r\n          <br/>\r\n          <app-suggestion [name]=\"'Product'\" [currentIds]=\"[0]\" [placeholder]=\"'نام محصول'\"\r\n                          (add)=\"addProduct($event)\"></app-suggestion>\r\n        </div>\r\n        <br/>\r\n        <table class=\"table little-right-margin\" style=\"float: right;\">\r\n          <thead>\r\n          <td>حذف</td>\r\n          <td>نمایش</td>\r\n          <td>برند</td>\r\n          <td>نوع</td>\r\n          <td>نام</td>\r\n          <td>شماره</td>\r\n          </thead>\r\n          <tbody>\r\n          <tr *ngFor=\"let p of currentCollection?.products; let i = index\">\r\n            <td>\r\n              <button mat-icon-button (click)=\"removeProduct(p._id)\" color=\"warn\">\r\n                <mat-icon aria-label=\"delete\">delete</mat-icon>\r\n              </button>\r\n            </td>\r\n            <td>\r\n              <button mat-icon-button (click)=\"viewProduct(p._id)\" color=\"primary\">\r\n                <mat-icon aria-label=\"view\">visibility</mat-icon>\r\n              </button>\r\n            </td>\r\n            <td>{{p.brand}}</td>\r\n            <td>{{p.product_type}}</td>\r\n            <td>{{p.name}}</td>\r\n            <td>{{i+1}}</td>\r\n          </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n      <div *ngIf=\"currentCollection?.is_smart\">\r\n        <div class=\"little-right-margin right-alignment\">\r\n          <br/>\r\n          <app-suggestion [name]=\"'Tag'\" [currentIds]=\"[0]\" [placeholder]=\"'نام تگ'\"\r\n                          (add)=\"addTag($event)\"></app-suggestion>\r\n        </div>\r\n        <br/>\r\n        <table class=\"table little-right-margin\" style=\"float: right;\">\r\n          <thead>\r\n          <td>حذف</td>\r\n          <td>نمایش</td>\r\n          <td>نام</td>\r\n          <td>شماره</td>\r\n          </thead>\r\n          <tbody>\r\n          <tr *ngFor=\"let t of currentCollection?.tags; let i = index\">\r\n            <td>\r\n              <button mat-icon-button (click)=\"removeTag(t._id)\" color=\"warn\">\r\n                <mat-icon aria-label=\"delete\">delete</mat-icon>\r\n              </button>\r\n            </td>\r\n            <td>\r\n              <button mat-icon-button (click)=\"viewTag(t._id)\" color=\"primary\">\r\n                <mat-icon aria-label=\"view\">visibility</mat-icon>\r\n              </button>\r\n            </td>\r\n            <td>{{t.name}}</td>\r\n            <td>{{i+1}}</td>\r\n          </tr>\r\n          </tbody>\r\n        </table>\r\n        <mat-form-field class=\"right-alignment font-yek\">\r\n          <mat-select placeholder=\"انواع\" [formControl]=\"types\" multiple class=\"right-alignment font-yek\" [(ngModel)]=\"typeIds\">\r\n            <mat-option *ngFor=\"let type of typesList\" [value]=\"type._id\"\r\n                        class=\"right-alignment font-yek\">&nbsp;{{ type.name }}&nbsp;</mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <br>\r\n        <mat-form-field class=\"right-alignment font-yek\">\r\n          <mat-select placeholder=\"تگ‌گروه‌ها\" [formControl]=\"tagGroups\" multiple class=\"right-alignment font-yek\" [(ngModel)]=\"tagGroupIds\">\r\n            <mat-option *ngFor=\"let tagGroup of tagGroupsList\" [value]=\"tagGroup._id\"\r\n                        class=\"right-alignment font-yek\">&nbsp;{{ tagGroup.name }}&nbsp;</mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <br>\r\n        <button mat-button (click)=\"updateDetails()\" class=\"right-alignment font-yek shallow-border\">بروز رسانی</button>\r\n      </div>\r\n    </div>\r\n  </mat-card>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/collections/components/view/view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_progress_service__ = __webpack_require__("../../../../../src/app/shared/services/progress.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ViewComponent = /** @class */ (function () {
    function ViewComponent(route, router, httpService, progressService, snackBar) {
        this.route = route;
        this.router = router;
        this.httpService = httpService;
        this.progressService = progressService;
        this.snackBar = snackBar;
        this.types = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]();
        this.typesList = [
            { _id: '5a7eff46c8b7d92b818f1f08', name: 'shoe' },
            { _id: '5a7f00bdc8b7d92b818f1f0b', name: 'sneakers' },
            { _id: '5a8d276282a1b20d50f28212', name: 'tshirts' },
        ];
        this.tagGroups = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]();
        this.tagGroupsList = [
            { _id: '5a8d274a82a1b20d50f2820f', name: 'taggroup1' },
            { _id: '5a8d275382a1b20d50f28210', name: 'taggroup2' },
            { _id: '5a8d275a82a1b20d50f28211', name: 'taggroup3' },
        ];
    }
    ViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.collectionId = params['id'] ? params['id'] : null;
            _this.currentCollection = [];
            _this.searchDetails();
        });
    };
    ViewComponent.prototype.searchDetails = function () {
        var _this = this;
        this.progressService.enable();
        this.httpService.get("collection/" + this.collectionId).subscribe(function (data) {
            data = data[0];
            _this.currentCollection = data;
            if (!data.is_smart) {
                _this.progressService.disable();
                return;
            }
            _this.typeIds = [];
            for (var typeId in data.types) {
                if (data.types.hasOwnProperty(typeId)) {
                    _this.typeIds.push(data.types[typeId]._id);
                }
            }
            _this.tagGroupIds = [];
            for (var tagGroupId in data.tagGroups) {
                if (data.tagGroups.hasOwnProperty(tagGroupId)) {
                    _this.tagGroupIds.push(data.tagGroups[tagGroupId]._id);
                }
            }
            _this.httpService.post("search/ProductType", {
                offset: 0,
                limit: 100,
                options: {
                    phrase: ''
                }
            }).subscribe(function (product_types) {
                _this.typesList = product_types.data;
                _this.httpService.post("search/TagGroup", {
                    offset: 0,
                    limit: 100,
                    options: {
                        phrase: ''
                    }
                }).subscribe(function (tag_groups) {
                    _this.tagGroupsList = tag_groups.data;
                    _this.progressService.disable();
                }, function (err) {
                    console.log('couldn\'t get tag groups', err);
                    _this.progressService.disable();
                });
            }, function (err) {
                console.log('couldn\'t get product types', err);
                _this.progressService.disable();
            });
        }, function (err) {
            console.log('Collection not found! ', err);
            _this.progressService.disable();
        });
    };
    ViewComponent.prototype.addProduct = function (expObj) {
        var _this = this;
        this.httpService.post("collection/product/" + this.currentCollection._id + "/" + expObj._id, {}).subscribe(function (data) {
            _this.searchDetails();
        }, function (err) {
            console.log('couldn\'t add product', err);
        });
    };
    ViewComponent.prototype.addTag = function (expObj) {
        var _this = this;
        this.httpService.post("collection/tag/" + this.currentCollection._id + "/" + expObj._id, {}).subscribe(function (data) {
            _this.searchDetails();
        }, function (err) {
            console.log('couldn\'t add tag', err);
        });
    };
    ViewComponent.prototype.viewProduct = function (pid) {
        this.router.navigate(["/agent/products/" + pid]);
    };
    ViewComponent.prototype.removeProduct = function (pid) {
        var _this = this;
        this.httpService.delete("collection/product/" + this.collectionId + "/" + pid).subscribe(function (data) {
            _this.searchDetails();
        });
    };
    ViewComponent.prototype.viewTag = function (tid) {
        this.router.navigate(["agent/tags/" + tid]);
    };
    ViewComponent.prototype.removeTag = function (tid) {
        var _this = this;
        this.httpService.delete("collection/tag/" + this.collectionId + "/" + tid).subscribe(function (data) {
            _this.searchDetails();
        });
    };
    ViewComponent.prototype.updateDetails = function () {
        var _this = this;
        this.progressService.enable();
        this.httpService.put("collection/detail/" + this.collectionId, {
            typeIds: this.typeIds,
            tagGroupIds: this.tagGroupIds
        }).subscribe(function (data) {
            _this.snackBar.open('Details updated', null, {
                duration: 3200
            });
            _this.progressService.disable();
        }, function (err) {
            _this.snackBar.open('Couldn\'t update details.', null, {
                duration: 3200
            });
            console.log(err);
            _this.progressService.disable();
        });
    };
    ViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-view',
            template: __webpack_require__("../../../../../src/app/admin/collections/components/view/view.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/collections/components/view/view.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["g" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__shared_services_progress_service__["a" /* ProgressService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["t" /* MatSnackBar */]])
    ], ViewComponent);
    return ViewComponent;
}());



/***/ }),

/***/ "../../../../util/node_modules/inherits/inherits_browser.js":
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "../../../../util/support/isBufferBrowser.js":
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "../../../../util/util.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__("../../../../util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__("../../../../util/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("../../../../webpack/buildin/global.js"), __webpack_require__("../../../../process/browser.js")))

/***/ })

});
//# sourceMappingURL=collections.module.chunk.js.map