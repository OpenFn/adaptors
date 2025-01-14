import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Encounter", () => {
    it("should create a simple Encounter", () => {
        const resource = builders.encounter("Encounter", {});
        assert.isOk(resource);
    });
});