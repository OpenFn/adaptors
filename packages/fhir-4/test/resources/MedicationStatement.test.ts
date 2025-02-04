import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("MedicationStatement", () => {
    it("should create a simple MedicationStatement", () => {
        const resource = builders.medicationStatement({});
        assert.isOk(resource);
    });
});