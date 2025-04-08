import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("TestReport", () => {
    it("should create a simple TestReport", () => {
        const resource = builders.testReport({});
        assert.isOk(resource);
    });
});