"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const node_fs_1 = require("node:fs");
const __1 = require("../");
const datetime_1 = require("../utils/datetime");
function log(message, level) {
    if (!message || message === "")
        return;
    logConsole(message);
    if (level && __1.config.logToFile)
        logLocal(message, level);
}
exports.log = log;
function logToFile(message, level) {
    var _a, _b;
    const err = new Error(message);
    const logLineDetails = (_b = (_a = err === null || err === void 0 ? void 0 : err.stack) === null || _a === void 0 ? void 0 : _a.split("at ")[1]) === null || _b === void 0 ? void 0 : _b.trim();
    return Buffer.from(`[${(0, datetime_1.formatDateTime)(Date.now())}] => ${level}, Origin: ${logLineDetails}, Message: ${message}\n`, "utf-8");
}
function logLocal(message, level) {
    let newLog = logToFile(message, level);
    let logs = Buffer.from([]);
    try {
        logs = (0, node_fs_1.readFileSync)(__1.config.logPath + __1.config.logName);
    }
    catch (err) {
        if (!(0, node_fs_1.existsSync)(__1.config.logPath))
            (0, node_fs_1.mkdirSync)(__1.config.logPath);
        logs = Buffer.from(`---- LOG HEAD | START DATE: ${(0, datetime_1.formatDateTime)(Date.now())}} ----\n`, "utf-8");
    }
    newLog = Buffer.concat([logs, newLog]);
    (0, node_fs_1.writeFileSync)(__1.config.logPath + __1.config.logName, newLog);
}
function logConsole(message) {
    console.log(message);
}
