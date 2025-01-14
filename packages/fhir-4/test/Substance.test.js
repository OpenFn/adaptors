import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Substance", () => {
    it("should create a simple Substance", () => {
        const resource = builders.substance("Substance", {});
        assert.isOk(resource);
    });
});