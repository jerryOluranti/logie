"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.pathSeperator = void 0;
const tslib_1 = require("tslib");
const node_process_1 = require("node:process");
const node_os_1 = require("node:os");
exports.pathSeperator = (0, node_os_1.platform)() === "win32" ? "\\" : "/";
function init() {
    let config;
    try {
        let path = "";
        if (node_process_1.env.DEV_MODE === "DEVELOPMENT") {
            path = `..${exports.pathSeperator}package.json`;
        }
        else {
            path = (0, node_process_1.cwd)()
                .split("node_modules")[0]
                .concat(exports.pathSeperator, "package.json");
        }
        config = require(path).logie;
    }
    catch (err) {
        config = undefined;
    }
    return {
        logName: (config === null || config === void 0 ? void 0 : config.logName) ? formatLogName(config.logName) : "test.log",
        logPath: node_process_1.env.DEV_MODE !== "DEVELOPMENT"
            ? formatPath((config === null || config === void 0 ? void 0 : config.logPath) ? config.logPath : "")
            : `${exports.pathSeperator}logs`,
        logToFile: (config === null || config === void 0 ? void 0 : config.logToFile) || false,
        defaultLevel: config === null || config === void 0 ? void 0 : config.defaultLevel,
        showOrigin: config === null || config === void 0 ? void 0 : config.showOrigin,
        showStackTrace: (config === null || config === void 0 ? void 0 : config.showStackTrace) || false
    };
}
function formatPath(path) {
    let formated = path.trim();
    let wd = (0, node_process_1.cwd)().split("node_modules")[0];
    if (!(formated.charAt(0) === exports.pathSeperator))
        formated = exports.pathSeperator.concat(path);
    if (!(formated.charAt(formated.length - 1) === exports.pathSeperator))
        formated = formated.concat(exports.pathSeperator);
    if (wd.lastIndexOf(exports.pathSeperator[0]) === wd.length - 1)
        wd = wd.slice(0, wd.length - 1);
    return wd
        .concat(formated)
        .concat("logs", exports.pathSeperator);
}
function formatLogName(name) {
    return name.endsWith(".log") ? name : name.concat(".log");
}
exports.config = init();
tslib_1.__exportStar(require("./logger"), exports);
tslib_1.__exportStar(require("./catch"), exports);
tslib_1.__exportStar(require("./query"), exports);
