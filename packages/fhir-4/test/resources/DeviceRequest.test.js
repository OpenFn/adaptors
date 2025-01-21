import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("DeviceRequest", () => {
    it("should create a simple DeviceRequest", () => {
        const resource = builders.deviceRequest({});
        assert.isOk(resource);
    });
});