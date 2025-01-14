import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Coverage", () => {
    it("should create a simple Coverage", () => {
        const resource = builders.coverage("Coverage", {});
        assert.isOk(resource);
    });
});