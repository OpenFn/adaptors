import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("MedicationRequest", () => {
    it("should create a simple MedicationRequest", () => {
        const resource = builders.medicationRequest("MedicationRequest", {});
        assert.isOk(resource);
    });
});