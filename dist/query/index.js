"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const tslib_1 = require("tslib");
const promises_1 = require("fs/promises");
const __1 = require("..");
const catch_1 = require("../catch");
const datetime_1 = require("../utils/datetime");
class Query {
    constructor(logPath) {
        this.logPath = logPath;
        this.node = new QueryFactory();
        this.logPath = logPath || __1.config.logPath;
        this.readFileToBuffer();
    }
    ;
    readFileToBuffer() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield (0, catch_1.catchAsync)((0, promises_1.readFile)(this.logPath));
            this.node.parse(data);
        });
    }
}
exports.Query = Query;
class QueryFactory {
    constructor() {
        this.size = 0;
        this.logs = [];
        this.temp = [];
    }
    get() {
        const _temp = this.temp;
        this.temp = [];
        return _temp;
    }
    parse(logBuffer) {
        var _a;
        let buf = logBuffer.toString().split('\n').reverse();
        buf.pop();
        buf = buf.reverse();
        this.logs = buf.map(log => {
            const parsedLog = log.split(",");
            return {
                timestamp: (0, datetime_1.parseDateTime)(parsedLog[0].split("=>")[0].trim().replace('[', '').replace(']', '')),
                level: parsedLog[0].split("=>")[1].trim(),
                stack: parsedLog[1].trim(),
                message: parsedLog[2].trim()
            };
        });
        this.size = this.logs.length;
        this.lastLogTime = ((_a = this.logs.at(-1)) === null || _a === void 0 ? void 0 : _a.timestamp) || undefined;
    }
    head(length = 5) {
        return this.logs.slice(0, length + 1);
    }
    tail(length = 5) {
        return this.logs.slice(this.logs.length - length + 1);
    }
    findByTimeStamp(timestamp) {
        return this.logs.find(log => log.timestamp === timestamp);
    }
    findByTimeRange(startTime, stopTime = 0) {
        if (startTime <= 0)
            throw new Error("Invalid startTime value");
        if (stopTime === 0) {
            this.temp = (this.temp || this.logs).filter(log => log.timestamp >= startTime);
            return this;
        }
        this.temp = (this.temp || this.logs).filter(log => log.timestamp >= startTime && log.timestamp <= stopTime);
        return this;
    }
    findByErrorLevel(level) {
        this.temp = (this.temp || this.logs).filter(log => log.level === level);
        return this;
    }
    findByErrorMessage(message) {
        this.temp = (this.temp || this.logs).filter(log => log.message.includes(message));
        return this;
    }
    findByStack(stack) {
        this.temp = (this.temp || this.logs).filter((log) => log.stack.includes(stack));
        return this;
    }
}
