import { initTestSuite } from "./index.test";
import { loggerTestSuite } from "./logger.test";
import { queryTestSuite } from "./query.test";

describe("Configuration and init tests", initTestSuite);
describe("Logger i/o opps and accuracy tests", loggerTestSuite);
describe("Query initialization and functionalities", queryTestSuite);