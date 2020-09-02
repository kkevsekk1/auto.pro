/**
 * 请求无障碍权限
 */
export declare function requestServicePermission(): import("rxjs").Observable<boolean>;
/**
 * 请求悬浮窗权限
 */
export declare function requestFloatyPermission(): import("rxjs").Observable<boolean>;
/**
 * 通过root开启无障碍服务
 */
export declare function openAccessibilityByRoot(): void;
export declare function isOpenAccessibilityByRoot(): boolean;
/**
 * 开启前台服务
 */
export declare function openForeground(): void;
/**
 * 关闭前台服务
 */
export declare function closeForeground(): void;
export declare function isOpenForeground(): boolean;
export declare function isOpenStableMode(): boolean;
/**
 * 开启稳定模式
 */
export declare function openStableMode(): void;
/**
 * 关闭稳定模式
 */
export declare function closeStableMode(): void;
