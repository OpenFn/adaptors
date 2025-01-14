import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Linkage", () => {
    it("should create a simple Linkage", () => {
        const resource = builders.linkage("Linkage", {});
        assert.isOk(resource);
    });
});