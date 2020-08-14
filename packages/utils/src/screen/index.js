"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenDirection$ = exports.requestLayout = exports.setSystemUiVisibility = exports.statusBarHeight = void 0;
var core_1 = require("@auto.pro/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var operators_2 = require("rxjs/operators");
var operators_3 = require("rxjs/operators");
var operators_4 = require("rxjs/operators");
var operators_5 = require("rxjs/operators");
var resources = context.getResources();
var resourceId = resources.getIdentifier("status_bar_height", "dimen", "android");
exports.statusBarHeight = resources.getDimensionPixelSize(resourceId);
/**
 * 设置状态栏和界面的显示情况
 *
 * @param {VISIBILITY_TYPE} type
 */
function setSystemUiVisibility(type) {
    var window = activity.getWindow();
    var decorView = window.getDecorView();
    switch (type) {
        case '无状态栏的沉浸式界面':
            window.getDecorView().setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_FULLSCREEN);
            decorView.getChildAt(0).getLayoutParams().height = exports.statusBarHeight + core_1.getHeightPixels();
            window.setStatusBarColor(android.graphics.Color.TRANSPARENT);
            break;
        case '有状态栏的沉浸式界面':
            decorView.setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
            decorView.getChildAt(0).getLayoutParams().height = exports.statusBarHeight + core_1.getHeightPixels();
            window.setStatusBarColor(android.graphics.Color.TRANSPARENT);
            exports.screenDirection$.subscribe(requestLayout);
        default:
            break;
    }
}
exports.setSystemUiVisibility = setSystemUiVisibility;
/**
 * 刷新屏幕
 */
function requestLayout() {
    var target = activity.getWindow().getDecorView().getChildAt(0);
    target.getLayoutParams().height = exports.statusBarHeight + core_1.getHeightPixels();
    target.requestLayout();
}
exports.requestLayout = requestLayout;
var screenDirectionSource = new rxjs_1.Subject();
/**
 * 屏幕旋转事件，返回旋转后的屏幕类型
 */
exports.screenDirection$ = screenDirectionSource.asObservable().pipe(operators_1.debounceTime(50), operators_3.map(function () { return context.getResources().getConfiguration().orientation; }), operators_3.map(function (v) {
    if (v === 1) {
        return '竖屏';
    }
    else {
        return '横屏';
    }
}), operators_4.distinctUntilChanged(), operators_2.skip(1), operators_5.share());
activity.getWindow().getDecorView().getChildAt(0).getViewTreeObserver().addOnGlobalLayoutListener(new JavaAdapter(android.view.ViewTreeObserver.OnGlobalLayoutListener, {
    onGlobalLayout: function () {
        screenDirectionSource.next(true);
    }
}));