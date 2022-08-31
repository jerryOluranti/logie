"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
var node_fs_1 = require("node:fs");
var __1 = require("../");
var datetime_1 = require("../utils/datetime");
var paint_1 = require("../utils/paint");
function log(message, level) {
    var _a;
    if (!message || message === "")
        return;
    var isError = message instanceof Error;
    var _level = level || (isError ? "ERROR" : (__1.config.defaultLevel || "LOG"));
    var stack = (!isError ? new Error("_") : message).stack;
    var origin = (_a = stack.split("at")[typeof message === "string" ? 2 : 1]) === null || _a === void 0 ? void 0 : _a.trim();
    var _message = !isError ? message : message.message;
    logConsole(_message, _level, __1.config.showOrigin ? origin : undefined, isError && __1.config.showStackTrace ? stack : undefined);
    if ((isError || typeof _message !== 'object') && __1.config.logToFile)
        logLocal(_message, _level, origin);
}
exports.log = log;
function generate(message, level, origin) {
    return Buffer.from("[".concat((0, datetime_1.formatDateTime)(Date.now()), "] => ").concat(level, ", Origin: ").concat(origin, ", Message: ").concat(message, "\n"), "utf-8");
}
function logLocal(message, level, origin) {
    var newLog = generate(message, level, origin);
    var logs = Buffer.from([]);
    try {
        logs = (0, node_fs_1.readFileSync)(__1.config.logPath + __1.config.logName);
    }
    catch (err) {
        if (!(0, node_fs_1.existsSync)(__1.config.logPath)) {
            (0, node_fs_1.mkdirSync)(__1.config.logPath, { recursive: true });
        }
        logs = Buffer.from("---- LOG HEAD | START DATE: ".concat((0, datetime_1.formatDateTime)(Date.now()), "} ----\n"), "utf-8");
    }
    newLog = Buffer.concat([logs, newLog]);
    (0, node_fs_1.writeFileSync)(__1.config.logPath + __1.config.logName, newLog);
}
function logConsole(message, level, origin, stack) {
    var _origin = origin ? (0, paint_1.getPaint)(level)("=> ".concat(origin.split(__1.pathSeperator).pop().replace(')', ''))) : "";
    if (typeof message === 'object') {
        console.log((0, paint_1.getBgPaint)(level)(" ".concat(level, " ")), _origin.replace('=>', '').trim());
        console.dir(message);
    }
    else {
        console.log((0, paint_1.getBgPaint)(level)(" ".concat(level, " ")), (0, paint_1.getPaint)(level)(" ".concat(message)), _origin);
        if (stack)
            console.log(transformStackTrace(stack));
    }
}
function transformStackTrace(stack) {
    var stackArr = stack.split('\n');
    stackArr.shift();
    return stackArr.join("\n");
}
