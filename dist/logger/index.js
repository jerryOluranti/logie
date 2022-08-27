"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const node_fs_1 = require("node:fs");
const __1 = require("../");
const datetime_1 = require("../utils/datetime");
const paint_1 = require("../utils/paint");
function log(message, level) {
    var _a;
    if (!message || message === "")
        return;
    const isError = message instanceof Error;
    const _level = level || (isError ? "ERROR" : (__1.config.defaultLevel || "LOG"));
    const stack = (!isError ? new Error("_") : message).stack;
    const origin = (_a = stack.split("at")[typeof message === "string" ? 2 : 1]) === null || _a === void 0 ? void 0 : _a.trim();
    const _message = !isError ? message : message.message;
    logConsole(_message, _level, __1.config.showOrigin ? origin : undefined, isError && __1.config.showStackTrace ? stack : undefined);
    if ((isError || typeof _message !== 'object') && __1.config.logToFile)
        logLocal(_message, _level, origin);
}
exports.log = log;
function generate(message, level, origin) {
    return Buffer.from(`[${(0, datetime_1.formatDateTime)(Date.now())}] => ${level}, Origin: ${origin}, Message: ${message}\n`, "utf-8");
}
function logLocal(message, level, origin) {
    let newLog = generate(message, level, origin);
    let logs = Buffer.from([]);
    try {
        logs = (0, node_fs_1.readFileSync)(__1.config.logPath + __1.config.logName);
    }
    catch (err) {
        if (!(0, node_fs_1.existsSync)(__1.config.logPath)) {
            (0, node_fs_1.mkdirSync)(__1.config.logPath, { recursive: true });
        }
        logs = Buffer.from(`---- LOG HEAD | START DATE: ${(0, datetime_1.formatDateTime)(Date.now())}} ----\n`, "utf-8");
    }
    newLog = Buffer.concat([logs, newLog]);
    (0, node_fs_1.writeFileSync)(__1.config.logPath + __1.config.logName, newLog);
}
function logConsole(message, level, origin, stack) {
    const _origin = origin ? (0, paint_1.getPaint)(level)("=> ".concat(origin.split(__1.pathSeperator).pop().replace(')', ''))) : "";
    if (typeof message === 'object') {
        console.log((0, paint_1.getBgPaint)(level)(` ${level} `), _origin.replace('=>', '').trim());
        console.dir(message);
    }
    else {
        console.log((0, paint_1.getBgPaint)(level)(` ${level} `), (0, paint_1.getPaint)(level)(` ${message}`), _origin);
        if (stack)
            console.log(transformStackTrace(stack));
    }
}
function transformStackTrace(stack) {
    let stackArr = stack.split('\n');
    stackArr.shift();
    return stackArr.join("\n");
}
