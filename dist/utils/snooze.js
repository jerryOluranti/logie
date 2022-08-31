"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function snooze(ms) {
    if (ms === void 0) { ms = 1000; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.default = snooze;
