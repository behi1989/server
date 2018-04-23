webpackJsonp(["product.module"],{

/***/ "../../../../../src/app/admin/product/all-products.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card-view {\r\n    margin: 10px;\r\n    /*box-shadow: 10px 10px 80px grey;*/\r\n}\r\n\r\nmat-card {\r\n  cursor: pointer;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/product/all-products.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" fxLayout=\"row\">\r\n  <app-search-fields fxFlex=\"100\" [target]=\"'Product'\" (searching)=\"search($event)\"></app-search-fields>\r\n</div>\r\n<div fxLayout=\"row\" class=\"row\">\r\n    <button mat-fab color=\"accent\" style=\"margin-top: 15px\" (click)=\"openForm()\">\r\n        <mat-icon aria-label=\"add new organization\">add</mat-icon>\r\n    </button>\r\n</div>\r\n<div *ngFor=\"let r of rows\" dir=\"rtl\">\r\n    <div fxLayout=\"row\" fxLayout.sm=\"column\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\"\r\n         fxLayoutAlign.sm=\"center center\" fxLayoutAlign.xs=\"center center\" class=\"row\">\r\n        <div fxFlex=\"20\" *ngFor=\"let p of r\" class=\"outer-card\">\r\n            <mat-card class=\"card-view\" (click)=\"select(p._id)\" [ngClass]=\"{'mat-elevation-z24': p._id === selectedId}\">\r\n                <mat-card-content>\r\n                    <div *ngIf=\"!p.imgDefaultPic\" style=\"text-align: center\">\r\n                        <img mat-card-image style=\"width: 60%; height: 60%\" [src]=\"getURL(p.imgUrl)\">\r\n                    </div>\r\n                    <div *ngIf=\"p.imgDefaultPic\" style=\"text-align: center\">\r\n                        <img mat-card-image style=\"width: 60%; height: 60%\" src=\"{{p.imgUrl}}\">\r\n                    </div>\r\n                    <hr>\r\n                    <div dir=\"rtl\" style=\"font-weight: bold; font-family: 'irankharazmi'\">\r\n                        {{p.name}}\r\n                    </div>\r\n                    <div dir=\"rtl\" style=\"font-family: 'irankharazmi'\">\r\n                        <span>قیمت پایه :</span>\r\n                        {{p.base_price}}\r\n                    </div>\r\n                </mat-card-content>\r\n                <mat-card-actions style=\"text-align: left\" *ngIf=\"p._id == selectedId\">\r\n                    <button mat-icon-button type (click)=\"deleteProduct(p._id)\" color=\"warn\">\r\n                      <mat-icon aria-label=\"delete\">delete</mat-icon>\r\n                    </button>\r\n                    <button mat-icon-button (click)=\"openForm(p._id)\" color=\"accent\">\r\n                      <mat-icon aria-label=\"edit\">edit</mat-icon>\r\n                    </button>\r\n                    <button mat-icon-button (click)=\"openView(p._id)\" color=\"primary\">\r\n                        <mat-icon aria-label=\"view\">visibility</mat-icon>\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div>\r\n  <mat-paginator [length]=\"totalCards\" [pageSize]=\"8\" [pageSizeOptions]=\"[4, 8, 16, 32]\"\r\n                 (page)=\"changeOffset($event)\"></mat-paginator>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/product/all-products.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllProductsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_components_removing_confirm_removing_confirm_component__ = __webpack_require__("../../../../../src/app/shared/components/removing-confirm/removing-confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_components_abstract_search_abstract_search_component__ = __webpack_require__("../../../../../src/app/shared/components/abstract-search/abstract-search.component.ts");
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

// import {Router} from '@angular/router';

// import {MatDialog, MatSnackBar} from '@angular/material';
// import {ProgressService} from '../../shared/services/progress.service';

// import {priceFormatter} from '../../shared/lib/priceFormatter';
// import {DomSanitizer} from '@angular/platform-browser';

var AllProductsComponent = /** @class */ (function (_super) {
    __extends(AllProductsComponent, _super);
    function AllProductsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // tempUrl = '';
    // noPic;
    AllProductsComponent.prototype.ngOnInit = function () {
        this.key = 'Product';
        _super.prototype.ngOnInit.call(this);
    };
    // getAllProducts() {
    //   this.products = [];
    //   this.rows = [];
    //   this.httpService.get('product').subscribe(
    //     (data) => {
    //       for (const d in data.body) {
    //         this.tempUrl = data.body[d].colors.length ? data.body[d].colors[0].images[0] :
    //          '../../../../assets/pictures/product-small/11.jpeg';
    //         this.noPic = data.body[d].colors.length ? false : true;
    //         this.products.push({
    //           _id: data.body[d]._id,
    //           name: data.body[d].name,
    //           base_price: priceFormatter(data.body[d].base_price),
    //           product_type: data.body[d].product_type.name,
    //           brand: data.body[d].brand.name,
    //           imgUrl: this.tempUrl,
    //           imgDefaultPic: this.noPic,
    //         });
    //       }
    //     },
    //     (err) => {
    //       console.error('Cannot get products info. Error: ', err);
    //     }
    //   );
    //   this.searching();
    // }
    AllProductsComponent.prototype.openForm = function (id) {
        if (id === void 0) { id = null; }
        if (id)
            this.router.navigate(["/agent/products/productInfo/" + id]);
        else
            this.router.navigate(["/agent/products/productInfo/"]);
    };
    AllProductsComponent.prototype.openView = function (id) {
        if (id === void 0) { id = null; }
        if (id) {
            this.router.navigate(["/agent/products/" + id]);
        }
        else {
            this.router.navigate(['agent/products']);
        }
    };
    AllProductsComponent.prototype.deleteProduct = function (id) {
        var _this = this;
        if (id === void 0) { id = null; }
        var rmDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__shared_components_removing_confirm_removing_confirm_component__["a" /* RemovingConfirmComponent */], {
            width: '400px',
        });
        rmDialog.afterClosed().subscribe(function (status) {
            if (status) {
                _this.progressService.enable();
                _this.httpService.delete("/product/" + id).subscribe(function (data) {
                    _this.selectedId = null;
                    _this.snackBar.open('Product deleted successfully', null, {
                        duration: 2000,
                    });
                    _this.searching();
                    _this.progressService.disable();
                }, function (error) {
                    _this.snackBar.open('Cannot delete this product. Please try again', null, {
                        duration: 2700
                    });
                    _this.progressService.disable();
                });
            }
        }, function (err) {
            console.log('Error in dialog: ', err);
        });
    };
    AllProductsComponent.prototype.getURL = function (path) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_1__shared_services_http_service__["a" /* HttpService */].Host + path);
    };
    AllProductsComponent.prototype.ngOnDestroy = function () {
    };
    AllProductsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-all-products',
            template: __webpack_require__("../../../../../src/app/admin/product/all-products.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/product/all-products.component.css")]
        })
    ], AllProductsComponent);
    return AllProductsComponent;
}(__WEBPACK_IMPORTED_MODULE_3__shared_components_abstract_search_abstract_search_component__["a" /* AbstractSearchComponent */]));



/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-basic-form/product-basic-form.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".row{\r\n    margin: 0px 10px;\r\n}\r\n\r\n.field-container{\r\n    width: 100%;\r\n    margin: 5px;\r\n}\r\n\r\n.field{\r\n    width: 100%;\r\n}\r\n\r\n.farsi{\r\n    direction:rtl;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-basic-form/product-basic-form.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"card-view\">\r\n    <mat-card-header style=\"direction:rtl\">\r\n        <mat-card-title>\r\n            <div *ngIf=\"!productId\"><b>افزودن محصول جدید</b></div>\r\n            <div *ngIf=\"productId\"><b>ویرایش محصول</b></div>\r\n        </mat-card-title>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n        <form (ngSubmit)=\"modifyProduct()\" [formGroup]=\"productBasicForm\">\r\n            <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\"\r\n                 fxLayoutAlign.xs=\"center center\" dir=\"rtl\">\r\n                <div fxFlex=\"50\" class=\"field-container\">\r\n                    <mat-input-container class=\"field farsi\">\r\n                        <input matInput type=\"text\" placeholder=\"نام\" formControlName=\"name\"\r\n                               role=\"name\"\r\n                               tabindex=\"2\"/>\r\n                        <mat-hint>نام محصول را وارد کنید</mat-hint>\r\n                        <mat-error\r\n                                *ngIf=\"productBasicForm.controls['name'].hasError('required')\">\r\n                            وارد کردن نام محصول الزامی است\r\n                        </mat-error>\r\n                    </mat-input-container>\r\n                </div>\r\n                <div fxFlex=\"50\" class=\"field-container\">\r\n                    <mat-input-container class=\"field farsi\">\r\n                        <input matInput type=\"number\" placeholder=\"قیمت پایه\" formControlName=\"base_price\"\r\n                               role=\"base_price\" tabindex=\"2\"/>\r\n                        <mat-hint>قیمت محصول را وارد کنید</mat-hint>\r\n                        <mat-error *ngIf=\"productBasicForm.controls['base_price'].hasError('required')\">\r\n                            وارد کردن قیمت محصول الزامی است\r\n                        </mat-error>\r\n                    </mat-input-container>\r\n                </div>\r\n            </div>\r\n            <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\"\r\n                 fxLayoutAlign.xs=\"center center\" dir=\"rtl\">\r\n                <div style=\"text-align: right\" class=\"field-container\">\r\n                    <mat-form-field fxFlex=\"100\" style=\"text-align:right;\" tabindex=\"3\">\r\n                        <mat-select placeholder=\"نوع محصول\" formControlName=\"product_type\" role=\"product_type\">\r\n                            <mat-option *ngFor=\"let type of types\" style=\"text-align:right\" [value]=\"type.value\">\r\n                                {{type.text}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                        <mat-hint>نوع محصول را انتخاب کنید</mat-hint>\r\n                        <mat-error *ngIf=\"productBasicForm.controls['product_type'].hasError('required')\">\r\n                            وارد کردن نوع محصول الزامی است\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div style=\"text-align: left\" class=\"field-container\">\r\n                    <mat-form-field fxFlex=\"100\" style=\"text-align:right\" tabindex=\"4\">\r\n                        <mat-select placeholder=\"برند\" formControlName=\"brand\" role=\"brand\">\r\n                            <mat-option *ngFor=\"let brand of brands\" style=\"text-align:right\"\r\n                                        [value]=\"brand.value\">\r\n                                {{brand.text}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                        <mat-hint>برند را انتخاب کنید</mat-hint>\r\n                        <mat-error *ngIf=\"productBasicForm.controls['brand'].hasError('required')\">\r\n                            وارد کردن برند محصول الزامی است\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n            </div>\r\n            <div class=\"field-container\" dir=\"rtl\">\r\n                <mat-input-container class=\"field\">\r\n                            <textarea matInput placeholder=\"توضیحات\" formControlName=\"desc\" role=\"desc\"\r\n                                      tabindex=\"5\"></textarea>\r\n                    <mat-hint>حداکثر تا 500 کاراکتر وارد کنید</mat-hint>\r\n                    <mat-error *ngIf=\"productBasicForm.controls['desc'].hasError('maxlength')\">تعداد\r\n                        کاراکترهای وارد شده بیش از تعداد مجاز می باشد\r\n                    </mat-error>\r\n                </mat-input-container>\r\n            </div>\r\n            <div role=\"submit-button\" style=\"text-align: left\">\r\n                <button mat-icon-button *ngIf=\"productId\" (click)=\"openView(productId)\" color=\"primary\">\r\n                    <mat-icon aria-label=\"view\" type=\"button\" >visibility</mat-icon>\r\n                </button>\r\n                <button mat-icon-button type=\"submit\"\r\n                        [disabled]=\"upsertBtnShouldDisabled || (!productBasicForm.valid) || (productId && !anyChanges)\"\r\n                        tabindex=\"6\" color=\"accent\">\r\n                    <mat-icon aria-label=\"accept\">done</mat-icon>\r\n                </button>\r\n                <button mat-icon-button *ngIf=\"productId\" color=\"warn\"\r\n                        type=\"button\" [disabled]=\"deleteBtnShouldDisabled\" (click)=\"deleteProduct(productId)\"\r\n                        tabindex=\"7\">\r\n                    <mat-icon aria-label=\"delete\">delete</mat-icon>\r\n                </button>\r\n            </div>\r\n        </form>\r\n    </mat-card-content>\r\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-basic-form/product-basic-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductBasicFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_progress_service__ = __webpack_require__("../../../../../src/app/shared/services/progress.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_components_removing_confirm_removing_confirm_component__ = __webpack_require__("../../../../../src/app/shared/components/removing-confirm/removing-confirm.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProductBasicFormComponent = /** @class */ (function () {
    function ProductBasicFormComponent(httpService, snackBar, route, router, dialog, progressService) {
        this.httpService = httpService;
        this.snackBar = snackBar;
        this.route = route;
        this.router = router;
        this.dialog = dialog;
        this.progressService = progressService;
        this.types = [
            { text: 'عینک', value: '5a813ae66760822bb8329a2b' },
            { text: 'تی شرت', value: '5a813ad56760822bb8329a2a' },
            { text: 'شلوار', value: '5a813ac86760822bb8329a29' },
            { text: 'کفش', value: '5a813b066760822bb8329a2c' },
        ];
        this.brands = [
            { text: 'نایک', value: '5a8138696760822bb8329a25' },
            { text: 'آدیداس', value: '5a81387d6760822bb8329a26' },
            { text: 'پلیس', value: '5a8138a56760822bb8329a28' },
            { text: 'گپ', value: '5a81388d6760822bb8329a27' },
        ];
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
        // productId: string = null;
        this.anyChanges = false;
        this.product = {};
        this.loadedValue = {};
        this.productId = null;
        this.productIdEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ProductBasicFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.route.params.subscribe(function (params) {
            _this.productId = params['id'];
            if (_this.productId) {
                _this.progressService.enable();
                _this.httpService.get("/product/" + _this.productId).subscribe(function (data) {
                    _this.product = data[0];
                    _this.loadedValue = data[0];
                    _this.progressService.disable();
                    _this.initForm();
                }, function (err) {
                    _this.progressService.disable();
                    console.error('Cannot get product info... Error: ', err);
                });
            }
            else {
                _this.productId = null;
            }
        });
        this.productIdEvent.emit(this.productId);
    };
    ProductBasicFormComponent.prototype.initForm = function () {
        var _this = this;
        this.productBasicForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]().group({
            name: [(Object.keys(this.loadedValue).length && this.loadedValue.name) ? this.loadedValue.name : null, [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                ]],
            base_price: [(Object.keys(this.loadedValue).length && this.loadedValue.base_price) ? this.loadedValue.base_price : null, [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                ]],
            product_type: [(Object.keys(this.loadedValue).length && this.loadedValue.product_type._id) ? this.loadedValue.product_type._id : null, [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                ]],
            brand: [(Object.keys(this.loadedValue).length && this.loadedValue.brand._id) ? this.loadedValue.brand._id : null, [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                ]],
            desc: [(Object.keys(this.loadedValue).length && this.loadedValue.desc) ? this.loadedValue.desc : null, [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(50),
                ]]
        }, {
            validator: this.basicInfoValidation
        });
        this.productBasicForm.valueChanges.subscribe(function (dt) { return _this.fieldChanged(); }, function (er) { return console.error('Error when subscribing on form valueChanges: ', er); });
    };
    ProductBasicFormComponent.prototype.modifyProduct = function () {
        var _this = this;
        var productBasicInfo = {
            id: this.productId,
            name: this.productBasicForm.controls['name'].value,
            base_price: this.productBasicForm.controls['base_price'].value,
            product_type: this.productBasicForm.controls['product_type'].value,
            brand: this.productBasicForm.controls['brand'].value,
            desc: this.productBasicForm.controls['desc'].value,
        };
        if (!this.productId) {
            delete productBasicInfo.id;
        }
        this.upsertBtnShouldDisabled = true;
        this.deleteBtnShouldDisabled = true;
        if (!this.productId) {
            this.httpService.put('product', productBasicInfo).subscribe(function (data) {
                _this.snackBar.open('Product is added', null, {
                    duration: 2300,
                });
                _this.productBasicForm.reset();
                _this.upsertBtnShouldDisabled = true;
                _this.deleteBtnShouldDisabled = true;
                _this.initForm();
                _this.anyChanges = false;
                _this.productId = data._id;
                _this.productIdEvent.emit(_this.productId);
            }, function (err) {
                console.error();
                _this.snackBar.open('Cannot add this product. Try again', null, {
                    duration: 3200,
                });
                _this.upsertBtnShouldDisabled = false;
                _this.deleteBtnShouldDisabled = false;
            });
        }
        else {
            if (this.productId) {
                this.httpService.post('product', productBasicInfo).subscribe(function (data) {
                    _this.snackBar.open('Product is updated', null, {
                        duration: 2300,
                    });
                    _this.upsertBtnShouldDisabled = false;
                    _this.deleteBtnShouldDisabled = false;
                    _this.anyChanges = false;
                    _this.productIdEvent.emit(_this.productId);
                }, function (err) {
                    console.error();
                    _this.snackBar.open('Cannot update this product. Try again', null, {
                        duration: 3200,
                    });
                    _this.upsertBtnShouldDisabled = false;
                    _this.deleteBtnShouldDisabled = false;
                });
            }
        }
    };
    ProductBasicFormComponent.prototype.openView = function (id) {
        if (id === void 0) { id = null; }
        if (id) {
            this.router.navigate(["/agent/products/" + id]);
        }
        else
            this.router.navigate(['agent/products']);
    };
    ProductBasicFormComponent.prototype.deleteProduct = function (id) {
        var _this = this;
        if (id === void 0) { id = null; }
        var rmDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__shared_components_removing_confirm_removing_confirm_component__["a" /* RemovingConfirmComponent */], {
            width: '400px',
        });
        rmDialog.afterClosed().subscribe(function (status) {
            if (status) {
                _this.progressService.enable();
                _this.httpService.delete("/product/" + id).subscribe(function (data) {
                    _this.snackBar.open('Product delete successfully', null, {
                        duration: 2000,
                    });
                    _this.progressService.disable();
                    _this.productId = null;
                    _this.router.navigate(['agent/products']);
                }, function (error) {
                    _this.snackBar.open('Cannot delete this product. Please try again', null, {
                        duration: 2700
                    });
                    _this.progressService.disable();
                });
            }
        }, function (err) {
            console.log('Error in dialog: ', err);
        });
    };
    ProductBasicFormComponent.prototype.fieldChanged = function () {
        var _this = this;
        if (!this.loadedValue || !Object.keys(this.loadedValue))
            return;
        this.anyChanges = false;
        Object.keys(this.productBasicForm.controls).forEach(function (el) {
            var tempValue = _this.loadedValue[el]._id ? _this.loadedValue[el]._id : _this.loadedValue[el];
            if (_this.productBasicForm.controls[el].value !== tempValue) {
                _this.anyChanges = true;
            }
        });
    };
    ProductBasicFormComponent.prototype.basicInfoValidation = function (Ac) {
    };
    ProductBasicFormComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ProductBasicFormComponent.prototype, "productIdEvent", void 0);
    ProductBasicFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-product-basic-form',
            template: __webpack_require__("../../../../../src/app/admin/product/components/product-basic-form/product-basic-form.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/product/components/product-basic-form/product-basic-form.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__shared_services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["t" /* MatSnackBar */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["g" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_5__shared_services_progress_service__["a" /* ProgressService */]])
    ], ProductBasicFormComponent);
    return ProductBasicFormComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-color/product-color.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".row{\r\n    margin: 0px 10px;\r\n}\r\n\r\n.field-container{\r\n    width: 100%;\r\n    margin: 5px;\r\n}\r\n\r\n.field{\r\n    width: 100%;\r\n}\r\n\r\n.farsi{\r\n    direction:rtl;\r\n}\r\n\r\n.rs-table{\r\n    margin: 10px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-color/product-color.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"card-view\">\r\n    <mat-card-content>\r\n        <form (ngSubmit)=\"modifyColor()\" [formGroup]=\"productColorForm\">\r\n            <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start start\"\r\n                 fxLayoutAlign.xs=\"center center\" dir=\"rtl\">\r\n                <div style=\"text-align: right\" fxFlex=\"100\" class=\"field-container\">\r\n                    <mat-form-field style=\"text-align:right;\">\r\n                        <mat-select placeholder=\"رنگ محصول\" formControlName=\"proColor\" role=\"proColor\"\r\n                                    [(ngModel)]=\"selectedColorId\">\r\n                            <mat-option *ngFor=\"let color of colors\" style=\"text-align:right\" [value]=\"color._id\">\r\n                                {{color.name}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                        <mat-hint>رنگ محصول را انتخاب کنید</mat-hint>\r\n                        <mat-error *ngIf=\"productColorForm.controls['proColor'].hasError('required')\">\r\n                            وارد کردن رنگ محصول الزامی است\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n                <p>{{selectedColor}}</p>\r\n                <app-uploader fxFlex=\"100\" *ngIf=\"selectedColorId\"\r\n                              [url]=\"'product/image/'+ productId + '/' + selectedColorId\"\r\n                              (images)=\"addToTable($event)\"></app-uploader>\r\n\r\n            </div>\r\n        </form>\r\n        <div dir=\"rtl\" style=\"width:100%\">\r\n            <mat-card>\r\n                <div class=\"rs-table\" style=\"width: 100%\">\r\n                    <table style=\"width: 100%\">\r\n                        <thead>\r\n                        <td style=\"width: 10%\"><b>ردیف</b></td>\r\n                        <td style=\"width: 10%\"><b>رنگ</b></td>\r\n                        <td style=\"width: 70%; text-align: center\"><b>تصاویر</b></td>\r\n                        <td style=\"width: 10%\"><b>حذف</b></td>\r\n                        </thead>\r\n                        <tbody>\r\n                        <tr *ngFor=\"let pc of productColors; let i = index\">\r\n                            <td>{{i+1}}</td>\r\n                            <td>{{pc.info.name}}</td>\r\n                            <td>\r\n                                <div style=\"text-align: center\">\r\n                                    <div *ngFor=\"let image of pc.images\" style=\"width: 10% ;height: 10%; display: inline-block;text-align: center;\">\r\n                                        <img style=\"width: 80% ;\" [src]=\"getURL(image)\">\r\n                                    </div>\r\n                                </div>\r\n                            </td>\r\n                            <td>\r\n                                <button mat-icon-button (click)=\"removeImg(pc.info._id)\" color=\"warn\">\r\n                                    <mat-icon aria-label=\"clear\">delete</mat-icon>\r\n                                </button>\r\n                            </td>\r\n                        </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </mat-card>\r\n        </div>\r\n    </mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-color/product-color.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductColorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_components_removing_confirm_removing_confirm_component__ = __webpack_require__("../../../../../src/app/shared/components/removing-confirm/removing-confirm.component.ts");
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







var ProductColorComponent = /** @class */ (function () {
    function ProductColorComponent(httpService, sanitizer, dialog, progressService, snackBar) {
        this.httpService = httpService;
        this.sanitizer = sanitizer;
        this.dialog = dialog;
        this.progressService = progressService;
        this.snackBar = snackBar;
        this.colors = [
            {
                _id: '5a8402148a4c831e60ce8cc4',
                name: 'سبز',
                color_id: '101'
            },
            {
                _id: '5a84022d8a4c831e60ce8cc5',
                name: 'قرمز',
                color_id: '102'
            },
            {
                _id: '5a8402498a4c831e60ce8cc6',
                name: 'صورتی',
                color_id: '103'
            },
            {
                _id: '5a8402628a4c831e60ce8cc7',
                name: 'بنفش',
                color_id: '104'
            }
        ];
        this.productColors = [];
        this.selectedColorId = null;
    }
    ProductColorComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.getProductColors();
    };
    ProductColorComponent.prototype.initForm = function () {
        this.productColorForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]().group({
            proColor: [null, [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                ]],
        });
    };
    ProductColorComponent.prototype.getProductColors = function () {
        var _this = this;
        this.httpService.get("product/color/" + this.productId).subscribe(function (res) {
            _this.productColors = [];
            res.colors.forEach(function (color) {
                _this.productColors.push(color);
            });
        }, function (err) {
            console.error();
        });
    };
    ProductColorComponent.prototype.removeImg = function (color_id) {
        var _this = this;
        var rmDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_4__shared_components_removing_confirm_removing_confirm_component__["a" /* RemovingConfirmComponent */], {
            width: '400px',
        });
        rmDialog.afterClosed().subscribe(function (status) {
            if (status) {
                _this.progressService.enable();
                _this.httpService.delete("/product/color/" + _this.productId + "/" + color_id).subscribe(function (data) {
                    _this.snackBar.open('Product images for this color deleted successfully', null, {
                        duration: 2000,
                    });
                    _this.progressService.disable();
                    _this.getProductColors();
                }, function (error) {
                    _this.snackBar.open('Cannot delete this product. Please try again', null, {
                        duration: 2700
                    });
                    _this.progressService.disable();
                });
            }
        }, function (err) {
            console.log('Error in dialog: ', err);
        });
    };
    ProductColorComponent.prototype.addToTable = function (images) {
        var _this = this;
        var pc = this.productColors.filter(function (x) { return x.info._id === _this.selectedColorId; })[0];
        if (pc) {
            pc.images = pc.images.concat(images);
        }
        else {
            var newProductColor = {
                images: images,
                info: this.colors.filter(function (x) { return x._id === _this.selectedColorId; })[0],
                _id: null
            };
            this.productColors.push(newProductColor);
        }
    };
    ProductColorComponent.prototype.getURL = function (path) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_2__shared_services_http_service__["a" /* HttpService */].Host + path);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ProductColorComponent.prototype, "productId", void 0);
    ProductColorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-product-color',
            template: __webpack_require__("../../../../../src/app/admin/product/components/product-color/product-color.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/product/components/product-color/product-color.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__shared_services_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MatDialog */],
            __WEBPACK_IMPORTED_MODULE_6__shared_services_progress_service__["a" /* ProgressService */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["t" /* MatSnackBar */]])
    ], ProductColorComponent);
    return ProductColorComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-full-info/product-full-info.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-full-info/product-full-info.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" class=\"row\" style=\"direction:ltr\">\r\n  <mat-card fxFlex=\"60\" fxFlex.sm=\"100\" fxFlex.xs=\"100\" fxFlexOffset=\"20\" fxFlexOffset.sm=\"0\" fxFlexOffset.xs=\"0\"  style=\"text-align: right\" dir=\"rtl\">\r\n    <mat-tab-group dir=\"rtl\">\r\n      <mat-tab label=\"اطلاعات اولیه\" dir=\"rtl\">\r\n        <app-product-basic-form (productIdEvent)=\"setProductId($event)\" ></app-product-basic-form>\r\n      </mat-tab>\r\n      <mat-tab label=\"رنگ های موجود\">\r\n        <app-product-color [productId]=\"productId\"></app-product-color>\r\n      </mat-tab>\r\n      <mat-tab label=\"سایزهای موجود\">\r\n        <app-product-size></app-product-size>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </mat-card>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-full-info/product-full-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductFullInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_progress_service__ = __webpack_require__("../../../../../src/app/shared/services/progress.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductFullInfoComponent = /** @class */ (function () {
    function ProductFullInfoComponent(httpService, snackBar, route, router, dialog, progressService) {
        this.httpService = httpService;
        this.snackBar = snackBar;
        this.route = route;
        this.router = router;
        this.dialog = dialog;
        this.progressService = progressService;
        this.product = {};
    }
    ProductFullInfoComponent.prototype.setProductId = function ($event) {
        this.productId = $event;
    };
    ProductFullInfoComponent.prototype.ngOnInit = function () {
    };
    ProductFullInfoComponent.prototype.ngOnDestroy = function () {
    };
    ProductFullInfoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-product-full-info',
            template: __webpack_require__("../../../../../src/app/admin/product/components/product-full-info/product-full-info.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/product/components/product-full-info/product-full-info.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__shared_services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["t" /* MatSnackBar */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["g" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_1__shared_services_progress_service__["a" /* ProgressService */]])
    ], ProductFullInfoComponent);
    return ProductFullInfoComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-size/product-size.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-size/product-size.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  product-size works!\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-size/product-size.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductSizeComponent; });
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

var ProductSizeComponent = /** @class */ (function () {
    function ProductSizeComponent() {
    }
    ProductSizeComponent.prototype.ngOnInit = function () {
    };
    ProductSizeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-product-size',
            template: __webpack_require__("../../../../../src/app/admin/product/components/product-size/product-size.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/product/components/product-size/product-size.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ProductSizeComponent);
    return ProductSizeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-view/product-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".main {\r\n    position: relative;\r\n    display: inline-block;\r\n    text-align: right;\r\n    width: 244px;\r\n    height: 314px;\r\n    overflow: hidden;\r\n    float: right;\r\n    margin-bottom: 34px;\r\n    background: #fff;\r\n    vertical-align: top;\r\n    font-size: 11px;\r\n    color: #666;\r\n    background: #fff;\r\n    padding:0;\r\n    cursor: pointer;\r\n}\r\n.main span {\r\n    display: inline-block;\r\n    border: 1px solid transparent;\r\n    padding: 13px 0 0 0;\r\n}\r\n.on {\r\n    z-index: 20 !important;\r\n    overflow: visible;\r\n}\r\n.on span {\r\n    border: 1px solid #ccc !important;\r\n    background: #fff;\r\n}\r\n.main p{\r\n    min-height: 20px;\r\n    border-bottom: 1px solid #CCC;\r\n    font-weight: bold;\r\n    margin: 10px 13px 0px;\r\n    font-size: 11px;\r\n    color: #222;\r\n}\r\n.main h2{\r\n    color: #222;\r\n    font-size: inherit;\r\n    margin: 0px 13px 0px ;\r\n}\r\n.main h3{\r\n    color: #666;\r\n    font-size: inherit;\r\n    margin: 0px 13px 6px;\r\n    font-weight: 200;\r\n}\r\n.main h4 {\r\n    color: #666;\r\n    font-size: inherit;\r\n    margin: -5px 13px 6px;\r\n    font-weight: 200;\r\n}\r\n.imgWrapper{\r\n    width: 220px;\r\n    margin: 0px 10px;\r\n    text-align: left;\r\n    max-height: 220px;\r\n    cursor: pointer;\r\n    background: #f5f5f5;\r\n    overflow: hidden;\r\n    direction:ltr;\r\n    -webkit-transition: all .5s ease-out;\r\n    transition: all .5s ease-out;\r\n}\r\n.imgWrapper img{\r\n    height: 220px;\r\n    position: relative;\r\n}\r\n.sliderWrapper {\r\n    width: 220px;\r\n    background: #fff;\r\n    margin: 0px 10px\r\n}\r\n.sliderWrapper i {\r\n    font-size: 16px;\r\n    vertical-align: middle;\r\n    position: relative;\r\n    top: -23px;\r\n}\r\n.sliderBlind {\r\n    width: 180px;\r\n    overflow: hidden;\r\n    display: inline-block;\r\n}\r\n.slider {\r\n    height: 60px;\r\n    background: #f5f5f5;\r\n    white-space: nowrap;\r\n    position: relative;\r\n    right: 0px;\r\n    -webkit-transition: all .5s ease-out;\r\n    transition: all .5s ease-out;\r\n}\r\n.slider img {\r\n    height: 60px;\r\n    display: inline-block;\r\n    -webkit-transform: scaleX(-1);\r\n            transform: scaleX(-1);\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-view/product-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" dir=\"rtl\">\r\n    <mat-card *ngIf=\"product[0]\" fxFlex=\"100\" fxFlex.sm=\"100\" fxFlex.xs=\"100\" fxFlexOffset=\"20\" fxFlexOffset.sm=\"0\"\r\n              fxFlexOffset.xs=\"0\">\r\n        <mat-card-header>\r\n            <mat-card-title>\r\n                <div style=\"font-weight: bold; font-family: irankharazmi\">{{product[0].name}}</div>\r\n            </mat-card-title>\r\n        </mat-card-header>\r\n        <mat-card-content>\r\n            <div *ngFor=\"let item of product[0].colors\">\r\n                <div class=\"imgWrapper\" *ngFor=\"let imgUrl of item.images\"\r\n                     style=\"display: inline-block; width: 10%; height: 10%;text-align: center\">\r\n                    <img style=\"width: 80%; height: 80%;\" [src]=\"getURL(imgUrl)\">\r\n                </div>\r\n            </div>\r\n            <hr>\r\n            <div style=\"font-weight: bold; font-family: irankharazmi\">\r\n                {{product[0].product_type.name}} {{ product[0].brand.name}}\r\n            </div>\r\n            <div style=\"font-weight: bold;font-family: irankharazmi\">\r\n                <div style=\"display: inline-block\"> دارای {{colorLength}} رنگ :</div>\r\n                <div style=\"display: inline-block\" *ngFor=\"let item of productColors\"> {{item}}{{'،'}}</div>\r\n            </div>\r\n            <div style=\"font-weight: bold; font-family: irankharazmi\">\r\n                قیمت محصول : {{product[0].base_price}} تومان\r\n            </div>\r\n            <div style=\"font-weight: bold; font-family: irankharazmi\">\r\n                توضیحات : {{product[0].desc}}\r\n            </div>\r\n        </mat-card-content>\r\n        <mat-card-actions style=\"text-align: left\">\r\n            <button mat-icon-button (click)=\"openForm(product[0]._id)\" color=\"accent\">\r\n                <mat-icon aria-label=\"edit\">edit</mat-icon>\r\n            </button>\r\n            <button mat-icon-button type (click)=\"deleteProduct(product[0]._id)\" color=\"warn\">\r\n                <mat-icon aria-label=\"delete\">delete</mat-icon>\r\n            </button>\r\n        </mat-card-actions>\r\n    </mat-card>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/product/components/product-view/product-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_http_service__ = __webpack_require__("../../../../../src/app/shared/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_progress_service__ = __webpack_require__("../../../../../src/app/shared/services/progress.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_components_removing_confirm_removing_confirm_component__ = __webpack_require__("../../../../../src/app/shared/components/removing-confirm/removing-confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_lib_priceFormatter__ = __webpack_require__("../../../../../src/app/shared/lib/priceFormatter.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProductViewComponent = /** @class */ (function () {
    function ProductViewComponent(snackBar, dialog, progressService, route, router, httpService, sanitizer) {
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.progressService = progressService;
        this.route = route;
        this.router = router;
        this.httpService = httpService;
        this.sanitizer = sanitizer;
        this.product = [];
        this.productId = null;
        this.productColors = [];
        this.colorLength = '';
    }
    ProductViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.productId = params['id'] ? params['id'] : null;
            if (_this.productId) {
                _this.progressService.enable();
                _this.httpService.get("/product/" + _this.productId).subscribe(function (data) {
                    _this.product.push(data[0]);
                    _this.product[0].base_price = Object(__WEBPACK_IMPORTED_MODULE_6__shared_lib_priceFormatter__["a" /* priceFormatter */])(_this.product[0].base_price);
                    _this.progressService.disable();
                }, function (err) {
                    _this.progressService.disable();
                    console.error('Cannot get product info. Error: ', err);
                });
            }
        });
        this.getProductColors();
    };
    ProductViewComponent.prototype.getURL = function (path) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_2__shared_services_http_service__["a" /* HttpService */].Host + path);
    };
    ProductViewComponent.prototype.getProductColors = function () {
        var _this = this;
        this.httpService.get("product/color/" + this.productId).subscribe(function (data) {
            for (var i = 0; i < data.colors.length; i++) {
                _this.productColors.push(data.colors[i].info.name);
            }
            _this.colorLength = Object(__WEBPACK_IMPORTED_MODULE_6__shared_lib_priceFormatter__["a" /* priceFormatter */])(data.colors.length);
        }, function (err) {
            console.error('Cannot get product info. Error: ', err);
        });
    };
    ProductViewComponent.prototype.openForm = function (id) {
        if (id === void 0) { id = null; }
        if (id)
            this.router.navigate(["/agent/products/productInfo/" + id]);
        else
            this.router.navigate(["/agent/products/productInfo/"]);
    };
    ProductViewComponent.prototype.deleteProduct = function (id) {
        var _this = this;
        if (id === void 0) { id = null; }
        var rmDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_5__shared_components_removing_confirm_removing_confirm_component__["a" /* RemovingConfirmComponent */], {
            width: '400px',
        });
        rmDialog.afterClosed().subscribe(function (status) {
            if (status) {
                _this.progressService.enable();
                _this.httpService.delete("/product/" + id).subscribe(function (data) {
                    _this.snackBar.open('Product delete successfully', null, {
                        duration: 2000,
                    });
                    _this.progressService.disable();
                    _this.productId = null;
                    _this.router.navigate(['agent/products']);
                }, function (error) {
                    _this.snackBar.open('Cannot delete this product. Please try again', null, {
                        duration: 2700
                    });
                    _this.progressService.disable();
                });
            }
        }, function (err) {
            console.log('Error in dialog: ', err);
        });
    };
    ProductViewComponent.prototype.ngOnDestroy = function () {
        this.productId = null;
        this.product = null;
    };
    ProductViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-product-view',
            template: __webpack_require__("../../../../../src/app/admin/product/components/product-view/product-view.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/product/components/product-view/product-view.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_material__["t" /* MatSnackBar */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_4__shared_services_progress_service__["a" /* ProgressService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["g" /* Router */], __WEBPACK_IMPORTED_MODULE_2__shared_services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ProductViewComponent);
    return ProductViewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/product/product.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductModule", function() { return ProductModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__product_routing__ = __webpack_require__("../../../../../src/app/admin/product/product.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__all_products_component__ = __webpack_require__("../../../../../src/app/admin/product/all-products.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_product_basic_form_product_basic_form_component__ = __webpack_require__("../../../../../src/app/admin/product/components/product-basic-form/product-basic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_product_view_product_view_component__ = __webpack_require__("../../../../../src/app/admin/product/components/product-view/product-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_product_full_info_product_full_info_component__ = __webpack_require__("../../../../../src/app/admin/product/components/product-full-info/product-full-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_product_color_product_color_component__ = __webpack_require__("../../../../../src/app/admin/product/components/product-color/product-color.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_product_size_product_size_component__ = __webpack_require__("../../../../../src/app/admin/product/components/product-size/product-size.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_components_uploader_uploader_component__ = __webpack_require__("../../../../../src/app/shared/components/uploader/uploader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var ProductModule = /** @class */ (function () {
    function ProductModule() {
    }
    ProductModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__all_products_component__["a" /* AllProductsComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_product_basic_form_product_basic_form_component__["a" /* ProductBasicFormComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_product_view_product_view_component__["a" /* ProductViewComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_product_full_info_product_full_info_component__["a" /* ProductFullInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_product_color_product_color_component__["a" /* ProductColorComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_product_size_product_size_component__["a" /* ProductSizeComponent */],
                __WEBPACK_IMPORTED_MODULE_12__shared_components_uploader_uploader_component__["a" /* UploaderComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__product_routing__["a" /* ProductRouting */],
                __WEBPACK_IMPORTED_MODULE_14__shared_shared_module__["a" /* SharedModule */],
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
                __WEBPACK_IMPORTED_MODULE_13_ng2_file_upload__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_14__shared_shared_module__["a" /* SharedModule */],
            ],
        })
    ], ProductModule);
    return ProductModule;
}());



/***/ }),

/***/ "../../../../../src/app/admin/product/product.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductRouting; });
/* unused harmony export ProductTestRouting */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router_testing__ = __webpack_require__("../../../router/esm5/testing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_product_view_product_view_component__ = __webpack_require__("../../../../../src/app/admin/product/components/product-view/product-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_product_basic_form_product_basic_form_component__ = __webpack_require__("../../../../../src/app/admin/product/components/product-basic-form/product-basic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__all_products_component__ = __webpack_require__("../../../../../src/app/admin/product/all-products.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_product_color_product_color_component__ = __webpack_require__("../../../../../src/app/admin/product/components/product-color/product-color.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_product_size_product_size_component__ = __webpack_require__("../../../../../src/app/admin/product/components/product-size/product-size.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_product_full_info_product_full_info_component__ = __webpack_require__("../../../../../src/app/admin/product/components/product-full-info/product-full-info.component.ts");








var Product_ROUTES = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_4__all_products_component__["a" /* AllProductsComponent */], pathMatch: 'full' },
    { path: 'productInfo/:id', component: __WEBPACK_IMPORTED_MODULE_7__components_product_full_info_product_full_info_component__["a" /* ProductFullInfoComponent */] },
    { path: 'productInfo', component: __WEBPACK_IMPORTED_MODULE_7__components_product_full_info_product_full_info_component__["a" /* ProductFullInfoComponent */] },
    { path: 'productBasicForm/:id', component: __WEBPACK_IMPORTED_MODULE_3__components_product_basic_form_product_basic_form_component__["a" /* ProductBasicFormComponent */] },
    { path: 'productBasicForm', component: __WEBPACK_IMPORTED_MODULE_3__components_product_basic_form_product_basic_form_component__["a" /* ProductBasicFormComponent */] },
    { path: 'productColor/:id', component: __WEBPACK_IMPORTED_MODULE_5__components_product_color_product_color_component__["a" /* ProductColorComponent */] },
    { path: 'productSize/:id', component: __WEBPACK_IMPORTED_MODULE_6__components_product_size_product_size_component__["a" /* ProductSizeComponent */] },
    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_2__components_product_view_product_view_component__["a" /* ProductViewComponent */] }
];
var ProductRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["h" /* RouterModule */].forChild(Product_ROUTES);
var ProductTestRouting = __WEBPACK_IMPORTED_MODULE_1__angular_router_testing__["a" /* RouterTestingModule */].withRoutes(Product_ROUTES);


/***/ }),

/***/ "../../../../../src/app/shared/components/uploader/uploader.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".my-drop-zone { border: dotted 3px lightgray; min-height:200px}\r\n.nv-file-over { border: dotted 3px red; }\r\n/* Default class applied to drop zones on over */\r\n.another-file-over-class { border: dotted 3px green; }\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/components/uploader/uploader.component.html":
/***/ (function(module, exports) {

module.exports = "<p>صف بارگذاری: {{ uploader?.queue?.length }}</p>\r\n<table class=\"table\" >\r\n  <thead>\r\n  <tr>\r\n    <th>نام فایل</th>\r\n    <th>اندازه</th>\r\n    <th>درصد پیشرفت</th>\r\n    <th>وضعیت</th>\r\n    <th>عملیات</th>\r\n  </tr>\r\n  </thead>\r\n  <tbody>\r\n  <tr *ngFor=\"let item of uploader.queue\">\r\n    <td><strong>{{ item?.file?.name }}</strong></td>\r\n    <td nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>\r\n    <td>\r\n      <div class=\"progress\" style=\"margin-bottom: 0;\">\r\n        <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': item.progress + '%' }\"></div>\r\n      </div>\r\n    </td>\r\n    <td class=\"text-center\">\r\n      <span *ngIf=\"item.isSuccess\"><i class=\"fa fa-check\"></i></span>\r\n      <span *ngIf=\"item.isCancel\"><i class=\"fa fa-ban\"></i></span>\r\n      <span *ngIf=\"item.isError\"><i class=\"fa fa-remove\"></i></span>\r\n    </td>\r\n    <td nowrap>\r\n      <button type=\"button\" class=\"btn btn-success btn-xs\"\r\n              (click)=\"item.upload()\" [disabled]=\"item.isReady || item.isUploading || item.isSuccess || !personnel_id\">\r\n        <span class=\"fa fa-upload\"></span> بارگذاری\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-warning btn-xs\"\r\n              (click)=\"item.cancel()\" [disabled]=\"!item.isUploading\">\r\n        <span class=\"fa fa-ban\"></span> لغو\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-danger btn-xs\"\r\n              (click)=\"item.remove()\">\r\n        <span class=\"fa fa-trash\"></span> حذف\r\n      </button>\r\n    </td>\r\n  </tr>\r\n  <tr><td colspan=\"5\"><div ng2FileDrop\r\n                           [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\"\r\n                           (fileOver)=\"fileOverBase($event)\"\r\n                           [uploader]=\"uploader\"\r\n                           class=\"well my-drop-zone\">\r\n  </div></td></tr>\r\n  </tbody>\r\n</table>\r\n\r\n<div >\r\n  <div>\r\n    پیشرفت صف:\r\n    <div class=\"progress\" style=\"\">\r\n      <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': uploader.progress + '%' }\"></div>\r\n    </div>\r\n  </div>\r\n  <button type=\"button\" class=\"btn btn-success btn-s\"\r\n          (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\r\n    <span class=\"fa fa-upload\"></span> بارگذاری همه\r\n  </button>\r\n  <button type=\"button\" class=\"btn btn-warning btn-s\"\r\n          (click)=\"uploader.cancelAll()\" [disabled]=\"!uploader.isUploading\">\r\n    <span class=\"fa fa-ban\"></span> لغو همه\r\n  </button>\r\n  <button type=\"button\" class=\"btn btn-danger btn-s\"\r\n          (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\r\n    <span class=\"fa fa-trash\"></span> حذف همه\r\n  </button>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/components/uploader/uploader.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UploaderComponent = /** @class */ (function () {
    function UploaderComponent() {
        this.hasBaseDropZoneOver = true;
        this.enabled = false;
        this.images = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.imagesList = [];
    }
    UploaderComponent.prototype.ngOnChanges = function (changes) {
        if (changes.url && changes.url.currentValue) {
            this.uploader = new __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__["FileUploader"]({ url: 'api/' + this.url });
        }
    };
    UploaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__["FileUploader"]({ url: 'api/' + this.url });
        this.enabled = true;
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            var result = JSON.parse(response);
            _this.imagesList.push(result.downloadURL);
        };
        this.uploader.onCompleteAll = function () {
            _this.images.emit(_this.imagesList);
            _this.imagesList = [];
        };
    };
    UploaderComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    UploaderComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], UploaderComponent.prototype, "url", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], UploaderComponent.prototype, "images", void 0);
    UploaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-uploader',
            template: __webpack_require__("../../../../../src/app/shared/components/uploader/uploader.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/components/uploader/uploader.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], UploaderComponent);
    return UploaderComponent;
}());



/***/ })

});
//# sourceMappingURL=product.module.chunk.js.map