import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Condition", () => {
    it("should create a simple Condition", () => {
        const resource = builders.condition("Condition", {});
        assert.isOk(resource);
    });
});