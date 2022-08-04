"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const tslib_1 = require("tslib");
const process_1 = require("process");
require("dotenv").config();
function init() {
    var _a, _b;
    let config;
    try {
        let path = "";
        if (process.env.DEV_MODE === "DEVELOPMENT") {
            path = "../package.json";
        }
        else {
            path = (0, process_1.cwd)().split("node_modules")[0].concat("/package.json");
        }
        config = require(path).logie;
    }
    catch (err) {
        config = undefined;
    }
    return {
        logName: (_a = config === null || config === void 0 ? void 0 : config.logName) !== null && _a !== void 0 ? _a : "test.log",
        logPath: process.env.DEV_MODE !== "DEVELOPMENT" ? `${(0, process_1.cwd)().split("node_modules")[0]}${(config === null || config === void 0 ? void 0 : config.logPath) || "/"}/logs/` : "/logs/",
        logToFile: (_b = config === null || config === void 0 ? void 0 : config.logToFile) !== null && _b !== void 0 ? _b : false,
    };
}
exports.config = init();
tslib_1.__exportStar(require("./logger"), exports);
tslib_1.__exportStar(require("./catch"), exports);
tslib_1.__exportStar(require("./query"), exports);
