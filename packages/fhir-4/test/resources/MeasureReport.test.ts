import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("MeasureReport", () => {
    it("should create a simple MeasureReport", () => {
        const resource = builders.measureReport({});
        assert.isOk(resource);
    });
});