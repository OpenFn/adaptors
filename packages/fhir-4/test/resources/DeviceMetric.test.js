import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("DeviceMetric", () => {
    it("should create a simple DeviceMetric", () => {
        const resource = builders.deviceMetric({});
        assert.isOk(resource);
    });
});