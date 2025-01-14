import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Medication", () => {
    it("should create a simple Medication", () => {
        const resource = builders.medication("Medication", {});
        assert.isOk(resource);
    });
});