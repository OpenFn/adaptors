import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-schedule", () => {
    it("should create a simple fr-core-schedule", () => {
        const resource = builders.schedule("fr-core-schedule", {});
        assert.isOk(resource);
    });
});