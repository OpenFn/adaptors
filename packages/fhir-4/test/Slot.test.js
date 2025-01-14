import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Slot", () => {
    it("should create a simple Slot", () => {
        const resource = builders.slot("Slot", {});
        assert.isOk(resource);
    });
});