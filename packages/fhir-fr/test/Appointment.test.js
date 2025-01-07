import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-appointment", () => {
    it("should create a simple fr-core-appointment", () => {
        const resource = builders.appointment("fr-core-appointment", {});
        assert.isOk(resource);
    });
});