import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Measure", () => {
    it("should create a simple Measure", () => {
        const resource = builders.measure("Measure", {});
        assert.isOk(resource);
    });
});