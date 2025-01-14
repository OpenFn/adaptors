import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Binary", () => {
    it("should create a simple Binary", () => {
        const resource = builders.binary("Binary", {});
        assert.isOk(resource);
    });
});