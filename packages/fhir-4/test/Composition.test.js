import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Composition", () => {
    it("should create a simple Composition", () => {
        const resource = builders.composition("Composition", {});
        assert.isOk(resource);
    });
});