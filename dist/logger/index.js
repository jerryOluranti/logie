"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const node_fs_1 = require("node:fs");
const __1 = require("../");
const datetime_1 = require("../utils/datetime");
const paint_1 = require("../utils/paint");
function log(message, level) {
    var _a, _b;
    if (!message || message === "")
        return;
    logConsole(message, level || __1.config.defaultLevel || "LOG");
    if (__1.config.logToFile)
        logLocal(message, level || __1.config.defaultLevel || "LOG", (_b = (_a = new Error(message).stack) === null || _a === void 0 ? void 0 : _a.split("at ")[2]) === null || _b === void 0 ? void 0 : _b.trim());
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
function logConsole(message, level) {
    console.log((0, paint_1.getBgPaint)(level)(` ${level} `), (0, paint_1.getPaint)(level)(` ${message} `));
}
