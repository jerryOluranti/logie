"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const node_fs_1 = require("node:fs");
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
        const data = (0, catch_1.catchSync)((0, node_fs_1.readFileSync)(this.logPath.concat(__1.config.logName)), () => { }, true);
        this.node.parse(data);
    }
}
exports.Query = Query;
class QueryFactory {
    constructor() {
        this.size = 0;
        this.logs = [];
    }
    get() {
        const _temp = this.temp || [];
        this.temp = undefined;
        return _temp;
    }
    getAll() {
        return this.logs;
    }
    parse(logBuffer) {
        var _a;
        let buf = logBuffer.toString().split('\n').reverse();
        buf.pop();
        buf = buf.reverse();
        buf.pop();
        this.logs = buf.map(log => {
            const parsedLog = log.split(",");
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
    }
    head(length = 5) {
        return this.logs.slice(0, length);
    }
    tail(length = 5) {
        return this.logs.slice(-1 * length);
    }
    findByTimeRange(startTime, stopTime = 0) {
        if (stopTime === 0) {
            this.temp = (this.temp || this.logs).filter(log => log.timestamp >= startTime);
            return this;
        }
        this.temp = (this.temp || this.logs).filter(log => log.timestamp >= startTime && log.timestamp <= stopTime);
        console.log(this.temp);
        return this;
    }
    findByLevel(level) {
        this.temp = (this.temp || this.logs).filter(log => log.level === level);
        return this;
    }
    findByMessage(message) {
        this.temp = (this.temp || this.logs).filter(log => log.message.includes(message));
        return this;
    }
    findByOrigin(origin) {
        this.temp = (this.temp || this.logs).filter((log) => log.origin.includes(origin));
        return this;
    }
}
