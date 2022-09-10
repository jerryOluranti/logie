"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchSyncNoReturn = exports.catchSync = exports.catchAsyncNoReturn = exports.catchAsync = void 0;
var tslib_1 = require("tslib");
var logger_1 = require("../logger");
function catchAsync(resolve, cb, _throw) {
    if (_throw === void 0) { _throw = false; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, resolve];
                case 1: return [2, (_a.sent())];
                case 2:
                    err_1 = _a.sent();
                    return [2, handleError(err_1, _throw, cb)];
                case 3: return [2];
            }
        });
    });
}
exports.catchAsync = catchAsync;
function catchAsyncNoReturn(resolve, cb, _throw) {
    if (_throw === void 0) { _throw = false; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var err_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, resolve];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    err_2 = _a.sent();
                    handleError(err_2, _throw, cb);
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
exports.catchAsyncNoReturn = catchAsyncNoReturn;
function catchSync(result, cb, _throw) {
    if (_throw === void 0) { _throw = false; }
    try {
        return result;
    }
    catch (err) {
        return handleError(err, _throw, cb);
    }
}
exports.catchSync = catchSync;
function catchSyncNoReturn(result, cb, _throw) {
    if (_throw === void 0) { _throw = false; }
    try {
        result;
    }
    catch (err) {
        handleError(err, _throw, cb);
    }
}
exports.catchSyncNoReturn = catchSyncNoReturn;
function handleError(err, _throw, cb) {
    (0, logger_1.log)(err, "ERROR");
    if (cb)
        cb(err);
    if (_throw)
        (0, logger_1.log)(err.message, 'ERROR');
    return undefined;
}
