import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("VisionPrescription", () => {
    it("should create a simple VisionPrescription", () => {
        const resource = builders.visionPrescription("VisionPrescription", {});
        assert.isOk(resource);
    });
});