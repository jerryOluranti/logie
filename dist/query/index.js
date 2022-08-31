"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
var node_fs_1 = require("node:fs");
var __1 = require("../");
var catch_1 = require("../catch");
var datetime_1 = require("../utils/datetime");
var Query = (function () {
    function Query(logPath) {
        this.logPath = logPath;
        this.node = new QueryFactory();
        this.logPath = logPath || __1.config.logPath;
        this.readFileToBuffer();
    }
    ;
    Query.prototype.readFileToBuffer = function () {
        var data = (0, catch_1.catchSync)((0, node_fs_1.readFileSync)(this.logPath.concat(__1.config.logName)), function () { }, true);
        this.node.parse(data);
    };
    return Query;
}());
exports.Query = Query;
var QueryFactory = (function () {
    function QueryFactory() {
        this.size = 0;
        this.logs = [];
    }
    QueryFactory.prototype.get = function () {
        var _temp = this.temp || [];
        this.temp = undefined;
        return _temp;
    };
    QueryFactory.prototype.getAll = function () {
        return this.logs;
    };
    QueryFactory.prototype.parse = function (logBuffer) {
        var _a;
        var buf = logBuffer.toString().split('\n').reverse();
        buf.pop();
        buf = buf.reverse();
        buf.pop();
        this.logs = buf.map(function (log) {
            var parsedLog = log.split(",");
            return {
                timestamp: (0, datetime_1.parseDateTime)(parsedLog[0].split("=>")[0].trim().replace('[', '').replace(']', '')),
                level: parsedLog[0].split("=>")[1].trim(),
                origin: parsedLog[1].trim().replace("Origin: ", ""),
                message: parsedLog[2].trim().replace("Message: ", "")
            };
        });
        this.size = this.logs.length;
        this.lastLogTime = ((_a = this.logs.at(-1)) === null || _a === void 0 ? void 0 : _a.timestamp) || undefined;
        this.startDate = this.logs[0].timestamp;
    };
    QueryFactory.prototype.head = function (length) {
        if (length === void 0) { length = 5; }
        return this.logs.slice(0, length);
    };
    QueryFactory.prototype.tail = function (length) {
        if (length === void 0) { length = 5; }
        return this.logs.slice(-1 * length);
    };
    QueryFactory.prototype.findByTimeRange = function (startTime, stopTime) {
        if (stopTime === void 0) { stopTime = 0; }
        if (stopTime === 0) {
            this.temp = (this.temp || this.logs).filter(function (log) { return log.timestamp >= startTime; });
            return this;
        }
        this.temp = (this.temp || this.logs).filter(function (log) { return log.timestamp >= startTime && log.timestamp <= stopTime; });
        console.log(this.temp);
        return this;
    };
    QueryFactory.prototype.findByLevel = function (level) {
        this.temp = (this.temp || this.logs).filter(function (log) { return log.level === level; });
        return this;
    };
    QueryFactory.prototype.findByMessage = function (message) {
        this.temp = (this.temp || this.logs).filter(function (log) { return log.message.includes(message); });
        return this;
    };
    QueryFactory.prototype.findByOrigin = function (origin) {
        this.temp = (this.temp || this.logs).filter(function (log) { return log.origin.includes(origin); });
        return this;
    };
    return QueryFactory;
}());
