import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("VisionPrescription", () => {
    it("should create a simple VisionPrescription", () => {
        const resource = builders.visionPrescription({});
        assert.isOk(resource);
    });
});