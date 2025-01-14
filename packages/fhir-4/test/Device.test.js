import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Device", () => {
    it("should create a simple Device", () => {
        const resource = builders.device("Device", {});
        assert.isOk(resource);
    });
});