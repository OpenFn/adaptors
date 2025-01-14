import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("MedicationKnowledge", () => {
    it("should create a simple MedicationKnowledge", () => {
        const resource = builders.medicationKnowledge("MedicationKnowledge", {});
        assert.isOk(resource);
    });
});