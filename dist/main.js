"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.pathSeperator = void 0;
var node_process_1 = require("node:process");
var node_os_1 = require("node:os");
exports.pathSeperator = (0, node_os_1.platform)() === "win32" ? "\\" : "/";
function init() {
    var config;
    try {
        var path = "";
        if (node_process_1.env.DEV_MODE === "DEVELOPMENT") {
            path = "..".concat(exports.pathSeperator, "package.json");
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
            : "".concat(exports.pathSeperator, "logs"),
        logToFile: (config === null || config === void 0 ? void 0 : config.logToFile) || false,
        defaultLevel: config === null || config === void 0 ? void 0 : config.defaultLevel,
        showOrigin: config === null || config === void 0 ? void 0 : config.showOrigin,
        showStackTrace: (config === null || config === void 0 ? void 0 : config.showStackTrace) || false
    };
}
function formatPath(path) {
    var formated = path.trim();
    var wd = (0, node_process_1.cwd)().split("node_modules")[0];
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
