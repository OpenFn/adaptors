import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Parameters", () => {
    it("should create a simple Parameters", () => {
        const resource = builders.parameters("Parameters", {});
        assert.isOk(resource);
    });
});