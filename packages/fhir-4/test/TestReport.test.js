import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("TestReport", () => {
    it("should create a simple TestReport", () => {
        const resource = builders.testReport("TestReport", {});
        assert.isOk(resource);
    });
});