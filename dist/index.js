"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const tslib_1 = require("tslib");
const node_process_1 = require("node:process");
const node_os_1 = require("node:os");
require("dotenv").config();
const pathSeperator = (0, node_os_1.platform)() === "win32" ? "\\" : "/";
function init() {
    var _a;
    let config;
    try {
        let path = "";
        if (process.env.DEV_MODE === "DEVELOPMENT") {
            path = `..${pathSeperator}package.json`;
        }
        else {
            path = (0, node_process_1.cwd)()
                .split("node_modules")[0]
                .concat(pathSeperator, "package.json");
        }
        config = require(path).logie;
    }
    catch (err) {
        config = undefined;
    }
    return {
        logName: (config === null || config === void 0 ? void 0 : config.logName) ? formatLogName(config.logName) : "test.log",
        logPath: process.env.DEV_MODE !== "DEVELOPMENT"
            ? formatPath((config === null || config === void 0 ? void 0 : config.logPath) ? config.logPath : "")
            : `${pathSeperator}logs`,
        logToFile: (_a = config === null || config === void 0 ? void 0 : config.logToFile) !== null && _a !== void 0 ? _a : false,
        defaultLevel: config === null || config === void 0 ? void 0 : config.defaultLevel
    };
}
function formatPath(path) {
    let formated = path.trim();
    let wd = (0, node_process_1.cwd)().split("node_modules")[0];
    if (!(formated.charAt(0) === pathSeperator))
        formated = pathSeperator.concat(path);
    if (!(formated.charAt(formated.length - 1) === pathSeperator))
        formated = formated.concat(pathSeperator);
    if (wd.lastIndexOf(pathSeperator[0]) === wd.length - 1)
        wd = wd.slice(0, wd.length - 1);
    return wd
        .concat(formated)
        .concat("logs", pathSeperator);
}
function formatLogName(name) {
    return name.endsWith(".log") ? name : name.concat(".log");
}
exports.config = init();
tslib_1.__exportStar(require("./logger"), exports);
tslib_1.__exportStar(require("./catch"), exports);
tslib_1.__exportStar(require("./query"), exports);
