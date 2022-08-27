"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchSyncNoReturn = exports.catchSync = exports.catchAsyncNoReturn = exports.catchAsync = void 0;
const tslib_1 = require("tslib");
const logger_1 = require("../logger");
function catchAsync(resolve, cb, _throw = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            return (yield resolve);
        }
        catch (err) {
            return handleError(err, cb, _throw);
        }
    });
}
exports.catchAsync = catchAsync;
function catchAsyncNoReturn(resolve, cb, _throw = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield resolve;
        }
        catch (err) {
            handleError(err, cb);
        }
    });
}
exports.catchAsyncNoReturn = catchAsyncNoReturn;
function catchSync(result, cb, _throw = false) {
    try {
        return result;
    }
    catch (err) {
        return handleError(err, cb);
    }
}
exports.catchSync = catchSync;
function catchSyncNoReturn(result, cb, _throw = false) {
    try {
        result;
    }
    catch (err) {
        handleError(err, cb);
    }
}
exports.catchSyncNoReturn = catchSyncNoReturn;
function handleError(err, _throw, cb) {
    (0, logger_1.log)(err, "ERROR");
    if (cb)
        cb(err);
    if (_throw)
        throw new Error(err.message);
    return undefined;
}
