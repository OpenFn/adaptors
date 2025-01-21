import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("DeviceDefinition", () => {
    it("should create a simple DeviceDefinition", () => {
        const resource = builders.deviceDefinition({});
        assert.isOk(resource);
    });
});