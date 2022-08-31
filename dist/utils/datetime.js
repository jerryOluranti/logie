"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDateTime = exports.formatDateTime = void 0;
function formatDateTime(timestamp) {
    var date = new Date(timestamp);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    var mm = month + 1 > 9 ? month + 1 : "0".concat(month + 1);
    var dd = day > 9 ? day : "0".concat(day);
    var hh = hour > 9 ? hour : "0".concat(hour);
    var _mins = mins > 9 ? mins : "0".concat(mins);
    var _secs = secs > 9 ? secs : "0".concat(secs);
    return "".concat(year, "-").concat(mm, "-").concat(dd, " ").concat(hh, ":").concat(_mins, ":").concat(_secs);
}
exports.formatDateTime = formatDateTime;
function parseDateTime(str) {
    var timestamp = Date.parse(str.trim().replace(" ", "T"));
    if (timestamp === 0 || isNaN(timestamp))
        throw new Error("Unable to parse datetime string; Invalid string format. [yyyy/mm/dd, hh:mm:ss]");
    return timestamp;
}
exports.parseDateTime = parseDateTime;
