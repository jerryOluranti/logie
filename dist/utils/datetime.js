"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDateTime = exports.formatDateTime = void 0;
function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    const mm = month + 1 > 9 ? month + 1 : `0${month + 1}`;
    const dd = day > 9 ? day : `0${day}`;
    const hh = hour > 9 ? hour : `0${hour}`;
    const _mins = mins > 9 ? mins : `0${mins}`;
    const _secs = secs > 9 ? secs : `0${secs}`;
    return `${year}-${mm}-${dd} ${hh}:${_mins}:${_secs}`;
}
exports.formatDateTime = formatDateTime;
function parseDateTime(str) {
    const timestamp = Date.parse(str.trim().replace(" ", "T"));
    if (timestamp === 0 || isNaN(timestamp))
        throw new Error("Unable to parse datetime string; Invalid string format. [yyyy/mm/dd, hh:mm:ss]");
    return timestamp;
}
exports.parseDateTime = parseDateTime;
