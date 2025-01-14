import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ValueSet", () => {
    it("should create a simple ValueSet", () => {
        const resource = builders.valueSet("ValueSet", {});
        assert.isOk(resource);
    });
});