import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Observation", () => {
    it("should create a simple Observation", () => {
        const resource = builders.observation("Observation", {});
        assert.isOk(resource);
    });
});