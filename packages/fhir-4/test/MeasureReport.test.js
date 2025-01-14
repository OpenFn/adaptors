import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("MeasureReport", () => {
    it("should create a simple MeasureReport", () => {
        const resource = builders.measureReport("MeasureReport", {});
        assert.isOk(resource);
    });
});