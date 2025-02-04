import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("MedicationDispense", () => {
    it("should create a simple MedicationDispense", () => {
        const resource = builders.medicationDispense({});
        assert.isOk(resource);
    });
});