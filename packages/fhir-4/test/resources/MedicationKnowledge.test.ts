import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("MedicationKnowledge", () => {
    it("should create a simple MedicationKnowledge", () => {
        const resource = builders.medicationKnowledge({});
        assert.isOk(resource);
    });
});