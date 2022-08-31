"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaint = exports.getBgPaint = void 0;
var tslib_1 = require("tslib");
var ansi_styles_1 = tslib_1.__importDefault(require("ansi-styles"));
function getBgPaint(level) {
    switch (level) {
        case "LOG":
            return compose(ansi_styles_1.default.bgColor.bgGray);
        case "INFO":
            return compose(ansi_styles_1.default.bgColor.bgGreenBright);
        case "DEBUG":
            return compose(ansi_styles_1.default.bgColor.bgCyan);
        case "WARN":
            return compose(ansi_styles_1.default.bgColor.bgYellow);
        case "ERROR":
            return compose(ansi_styles_1.default.bgColor.bgRedBright);
        case "CRITICAL":
            return compose(ansi_styles_1.default.bgColor.bgRed);
        case "FATAL":
            return compose(ansi_styles_1.default.bgColor.bgRed);
        default:
            return compose(ansi_styles_1.default.bgColor.bgGray);
    }
}
exports.getBgPaint = getBgPaint;
function getPaint(level) {
    switch (level) {
        case "LOG":
            return function (_) { return _; };
        case "INFO":
            return compose(ansi_styles_1.default.color.greenBright);
        case "DEBUG":
            return compose(ansi_styles_1.default.color.cyan);
        case "WARN":
            return compose(ansi_styles_1.default.color.yellow);
        case "ERROR":
            return compose(ansi_styles_1.default.color.redBright);
        case "CRITICAL":
            return compose(ansi_styles_1.default.color.red);
        case "FATAL":
            return compose(ansi_styles_1.default.color.red);
        default:
            return function (_) { return _; };
    }
}
exports.getPaint = getPaint;
function compose(color) {
    return function (str) { return "".concat(color.open).concat(str).concat(color.close); };
}
