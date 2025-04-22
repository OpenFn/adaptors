import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("VisionPrescription", () => {
    it("should create a simple VisionPrescription", () => {
        const resource = builders.visionPrescription({});
        assert.isOk(resource);
    });
});