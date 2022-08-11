"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaint = exports.getBgPaint = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
function getBgPaint(level) {
    switch (level) {
        case "LOG":
            return chalk_1.default.bgGray;
        case "INFO":
            return chalk_1.default.bgGreenBright;
        case "DEBUG":
            return chalk_1.default.bgCyan;
        case "WARN":
            return chalk_1.default.bgYellow;
        case "ERROR":
            return chalk_1.default.bgRedBright;
        case "CRITICAL":
            return chalk_1.default.bgRed;
        case "FATAL":
            return chalk_1.default.bgRed;
        default:
            return chalk_1.default.bgGray;
    }
}
exports.getBgPaint = getBgPaint;
function getPaint(level) {
    switch (level) {
        case "LOG":
            return (_) => _;
        case "INFO":
            return chalk_1.default.greenBright;
        case "DEBUG":
            return chalk_1.default.cyan;
        case "WARN":
            return chalk_1.default.yellow;
        case "ERROR":
            return chalk_1.default.redBright;
        case "CRITICAL":
            return chalk_1.default.red;
        case "FATAL":
            return chalk_1.default.red;
        default:
            return (_) => _;
    }
}
exports.getPaint = getPaint;
